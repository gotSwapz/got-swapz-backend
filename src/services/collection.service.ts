import axios from "axios";
import { ethers } from "ethers";
import { Op } from "sequelize";
import {
  collectionRepository,
  nftRepository,
  packageRepository,
  swapRepository,
  userRepository,
} from "../app";
import { CollectionDao } from "../database/collection.dao";
import { PackageDao } from "../database/package.dao";
import { ErrorCode } from "../errors/error-code";
import { ErrorException } from "../errors/error-exception";
import { collectionSourceCode } from "../resources/collectionSourceCode";
import * as s3Service from "../services/s3.service";

export const update = async (
  collection: any,
  files: {
    [fieldname: string]: Express.Multer.File[];
  }
): Promise<{}> => {
  if (!files?.logo || !files.logo[0])
    throw new ErrorException(ErrorCode.RequiredField, { field: "logo" });
  if (!files?.banner || !files.banner[0])
    throw new ErrorException(ErrorCode.RequiredField, { field: "banner" });

  const logo = files.logo[0];
  const banner = files.banner[0];

  const collectionFound = await collectionRepository.findByPk(collection.id);
  if (!collectionFound) throw new ErrorException(ErrorCode.NotFound);

  try {
    await collectionRepository.update(
      { ...collection },
      { where: { id: collection.id } }
    );

    collection.packages.forEach(async (_package: PackageDao) => {
      await packageRepository.create({
        units: _package.units,
        price: _package.price,
        collectionId: collection.id,
      });
    });

    const logoUrl = await s3Service.uploadFile(
      logo,
      `${process.env.COLLECTION_LOGO_FOLDER}/${collection.id}.${
        logo.originalname.split(".")[1]
      }`
    );

    const bannerUrl = await s3Service.uploadFile(
      banner,
      `${process.env.COLLECTION_BANNER_FOLDER}/${collection.id}.${
        banner.originalname.split(".")[1]
      }`
    );

    await collectionRepository.update(
      { logoUrl, bannerUrl },
      { where: { address: collection.address } }
    );

    return { success: true };
  } catch (err: any) {
    if (err.errors?.length) {
      throw new Error(err.errors[0].message);
    } else {
      throw new Error(err.message);
    }
  }
};

export const get = async (id: number): Promise<CollectionDao> => {
  const collection = await collectionRepository.findByPk(id, {
    include: [
      packageRepository,
      swapRepository,
      { model: nftRepository, include: [userRepository] },
    ],
    nest: true,
  });

  if (!collection) throw new ErrorException(ErrorCode.NotFound);

  return collection;
};

export const getAll = async (): Promise<CollectionDao[]> => {
  return await collectionRepository.findAll({
    where: { address: { [Op.ne]: null } },
  });
};

// https://docs.polygonscan.com/v/mumbai-polygonscan/api-endpoints/contracts#verify-source-code
export const verifyContract = async (
  contractAddress: string,
  owner: string,
  name: string,
  uri: string,
  packageUnits: number[],
  packagePrices: number[],
  rarity: number[]
): Promise<any> => {
  const polygonScanUrl =
    process.env.NETWORK === "testnet"
      ? process.env.MUMBAI_POLYGON_SCAN_URL
      : process.env.MAINNET_POLYGON_SCAN_URL;

  const abiCoder = new ethers.utils.AbiCoder();
  const constructorArguements = abiCoder.encode(
    ["address", "string", "string", "uint8[]", "uint256[]", "uint8[]"],
    [owner, name, uri, packageUnits, packagePrices, rarity]
  );

  const payload = {
    apiKey: process.env.POLYGONSCAN_API_KEY,
    module: "contract",
    action: "verifysourcecode",
    contractAddress,
    sourceCode: collectionSourceCode,
    codeformat: "solidity-single-file",
    contractname: "GotSwapzCollection",
    compilerVersion: "v0.8.17+commit.8df45f5f",
    optimizationUsed: 1,
    runs: 200,
    constructorArguements,
    evmversion: "",
    licenseType: 3,
  };

  const res = await axios.post(`${polygonScanUrl}`, payload);
  return { success: true };
};
