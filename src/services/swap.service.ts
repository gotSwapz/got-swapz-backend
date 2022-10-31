import {
  collectionRepository,
  nftRepository,
  swapRepository,
  userRepository,
} from "../app";
import { SwapDao } from "../database/swap.dao";
import { SwapState } from "../enums/swapState.enum";
import * as userService from "../services/user.service";
import { ErrorCode } from "../errors/error-code";
import { ErrorException } from "../errors/error-exception";

export const create = async (swap: SwapDao): Promise<SwapDao> => {
  try {
    const newSwap = await swapRepository.create({
      creator: swap.creator,
      receiver: swap.receiver,
      creatorNfts: swap.creatorNfts,
      receiverNfts: swap.receiverNfts,
      state: SwapState.OFFERED,
      collectionId: swap.collectionId,
      swapIdInCollection: swap.swapIdInCollection,
    });
    await userService.removeNfts(swap.creator, swap.creatorNfts);

    return newSwap;
  } catch (err: any) {
    if (err.errors?.length) {
      throw new Error(err.errors[0].message);
    } else {
      throw new Error(err.message);
    }
  }
};

export const updateState = async (
  id: number,
  state: SwapState
): Promise<SwapDao> => {
  const swap = await swapRepository.findByPk(id);
  if (!swap) throw new ErrorException(ErrorCode.NotFound);
  try {
    await swap.update({ state });
    if (state === SwapState.EXECUTED) {
      await userService.addNfts(swap.creator, swap.receiverNfts);
      await userService.addNfts(swap.receiver, swap.creatorNfts);
    } else {
      await userService.addNfts(swap.creator, swap.creatorNfts);
    }
    return swap;
  } catch (err: any) {
    if (err.errors.length) {
      throw new Error(err.errors[0].message);
    } else {
      throw new Error(err.message);
    }
  }
};

export const get = async (id: number): Promise<any> => {
  const swap = await swapRepository.findByPk(id, {
    include: [{ model: collectionRepository, include: [nftRepository] }],
    nest: true,
  });
  if (!swap) throw new ErrorException(ErrorCode.NotFound);
  const creator = await userRepository.findByPk(swap.creator);
  const receiver = await userRepository.findByPk(swap.receiver);
  return {
    collection: swap.collection,
    state: swap.state,
    creator: swap.creator,
    receiver: swap.receiver,
    creatorNfts: swap.creatorNfts,
    receiverNfts: swap.receiverNfts,
    creatorAvatar: creator?.avatarUrl,
    receiverAvatar: receiver?.avatarUrl,
    createdAt: swap.createdAt,
    swapIdInCollection: swap.swapIdInCollection,
  };
};

export const getByCreator = async (userAddress: string): Promise<SwapDao[]> => {
  return await swapRepository.findAll({ where: { creator: userAddress } });
};

export const getByReceiver = async (
  userAddress: string
): Promise<SwapDao[]> => {
  return await swapRepository.findAll({ where: { receiver: userAddress } });
};
