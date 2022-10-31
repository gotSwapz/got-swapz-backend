import {
  collectionRepository,
  nftRepository,
  swapRepository,
  userRepository,
} from "../app";
import { userNftRepository } from "../app";
import * as purchaseService from "../services/purchase.service";
import * as s3Service from "../services/s3.service";
import { UserDao } from "../database/user.dao";
import { ErrorCode } from "../errors/error-code";
import { ErrorException } from "../errors/error-exception";

export const update = async (
  user: any,
  files: {
    [fieldname: string]: Express.Multer.File[];
  }
): Promise<{}> => {
  const userFound = await userRepository.findByPk(user.address);
  if (!userFound) throw new ErrorException(ErrorCode.NotFound);
  let newAvatar;

  try {
    await userRepository.update(
      { ...user },
      { where: { address: user.address } }
    );

    if (files?.avatar && files.avatar[0]) {
      const avatar = files.avatar[0];
      const avatarUrl = await s3Service.uploadFile(
        avatar,
        `${process.env.USER_AVATAR_FOLDER}/${user.address}.${
          avatar.originalname.split(".")[1]
        }`
      );
      newAvatar = avatarUrl;
      await userRepository.update(
        { avatarUrl },
        { where: { address: user.address } }
      );
    }

    if (files?.banner && files.banner[0]) {
      const banner = files.banner[0];
      const bannerUrl = await s3Service.uploadFile(
        banner,
        `${process.env.USER_BANNER_FOLDER}/${user.address}.${
          banner.originalname.split(".")[1]
        }`
      );
      await userRepository.update(
        { bannerUrl },
        { where: { address: user.address } }
      );
    }

    return { success: true, newAvatar };
  } catch (err: any) {
    if (err.errors?.length) {
      throw new Error(err.errors[0].message);
    } else {
      throw new Error(err.message);
    }
  }
};

export const get = async (address: string, full = false): Promise<any> => {
  const user = await userRepository.findByPk(address, {
    include: [
      {
        model: swapRepository,
        as: "swapsAsReceiver",
        include: [collectionRepository],
      },
      {
        model: swapRepository,
        as: "swapsAsCreator",
        include: [collectionRepository],
      },
      collectionRepository,
    ],
  });
  if (!user) throw new ErrorException(ErrorCode.NotFound);

  const resp: any = {
    address: user.address,
    name: user.name,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    bannerUrl: user.bannerUrl,
    collections: user.collections,
  };

  if (full) {
    resp.email = user.email;
    resp.receiveNotifications = user.receiveNotifications;
    resp.swapsAsCreator = user.swapsAsCreator;
    resp.swapsAsReceiver = user.swapsAsReceiver;

    const nftIdsMapping: { [key: number]: number } = {};
    const allSwaps = [...user.swapsAsCreator, ...user.swapsAsReceiver];
    const promises: Promise<any>[] = [];
    for (const swap of allSwaps) {
      const allNfts = [...swap.creatorNfts, ...swap.receiverNfts];
      for (const nftId of allNfts) {
        promises.push(getNftMapping(nftId));
      }
    }
    (await Promise.all(promises)).forEach((map) => {
      nftIdsMapping[map[0]] = map[1];
    });
    resp.nftIdsMapping = nftIdsMapping;
  }

  return resp;
};

export const addNfts = async (
  userAddress: string,
  nftIds: number[],
  requestId?: string
): Promise<void> => {
  for (const nftId of nftIds) {
    const userNft = await userNftRepository.findOne({
      where: { nftId, userAddress },
    });
    if (userNft) {
      await userNft.increment("copies");
    } else {
      await userNftRepository.create({
        nftId,
        userAddress,
        copies: 1,
      });
    }
  }

  if (requestId) {
    try {
      purchaseService.updateProcessed(requestId);
    } catch (err: any) {
      console.log(err);
    }
  }
};

export const addNftsByCollectionIds = async (
  userAddress: string,
  collectionAddress: string,
  nftIdsInCollection: number[],
  requestId: string
): Promise<void> => {
  const collection = await collectionRepository.findOne({
    where: { address: collectionAddress },
  });
  if (!collection)
    throw new ErrorException(ErrorCode.NotFound, "Collection not found");

  const nftIds: number[] = [];
  for (const nftIdInCollection of nftIdsInCollection) {
    const nft = await nftRepository.findOne({
      where: { idInCollection: nftIdInCollection, collectionId: collection.id },
    });
    if (!nft) throw new ErrorException(ErrorCode.NotFound, "NFT not found");
    nftIds.push(nft.id);
  }

  addNfts(userAddress, nftIds, requestId);
};

export const removeNfts = async (
  userAddress: string,
  nftIds: number[]
): Promise<void> => {
  for (const nftId of nftIds) {
    const userNft = await userNftRepository.findOne({
      where: { nftId, userAddress },
    });
    if (!userNft) {
      throw new ErrorException(ErrorCode.NotFound);
    }
    if (userNft.copies > 1) {
      await userNft.decrement("copies");
    } else {
      await userNft.destroy();
    }
  }
};

const getNftMapping = async (nftId: number) => {
  const nft = await nftRepository.findByPk(nftId);
  if (nft) {
    return [nftId, nft.idInCollection];
  }
  return [nftId, 0];
};
