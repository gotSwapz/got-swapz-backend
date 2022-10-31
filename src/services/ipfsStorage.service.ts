import StreamZip from "node-stream-zip";
import path from "path";
import fs from "fs";
import { NFTStorage, File } from "nft.storage";
import { Metadata } from "../models/metadata.model";
import { collectionRepository, nftRepository } from "../app";
import { ErrorException } from "../errors/error-exception";
import { ErrorCode } from "../errors/error-code";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];

export const storeCollection = async (fileName: string) => {
  const storagePath = process.env.STORAGE_PATH;

  const { images, metadatas, rarity, ext } = await extractFiles(
    storagePath + fileName
  );

  const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY! });

  // Store images
  const imagesCid = await nftstorage.storeDirectory(images);

  // Map metadata objects to files
  const metadataFiles: File[] = metadatas.map((metadata, index) => {
    metadata.image = `ipfs://${imagesCid}/${images[index].name}`;
    return new File(
      [JSON.stringify(metadata)],
      `${eip1155Id(index + 1)}.json`,
      {
        type: "application/json",
      }
    );
  });

  // Store metadatas
  const metadatasCid = await nftstorage.storeDirectory(metadataFiles);
  console.log({ metadatasCid });

  // Delete zip file
  fs.unlinkSync(storagePath + fileName);

  const raritySum = rarity.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  let collection: any;
  try {
    // Create collection (not active until the smart contract is created)
    collection = await collectionRepository.create({
      metadataUri: `ipfs://${metadatasCid}/{id}.json`,
      nftImagesUri: `ipfs://${imagesCid}/{id}.${ext}`,
      numberOfItems: images.length,
      raritySum,
    });

    // Create NFT objects
    metadatas.map(async (metadata, index) => {
      await nftRepository.create({
        idInCollection: index + 1,
        name: metadata.name,
        description: metadata.description,
        imageUri: metadata.image,
        properties: metadata.properties,
        collectionId: collection.id,
        rarity: rarity[index],
      });
    });
  } catch (err: any) {
    if (err.errors?.length) {
      throw new Error(err.errors[0].message);
    } else {
      throw new Error(err.message);
    }
  }

  return {
    imagesUri: collection.nftImagesUri,
    metadataUri: collection.metadataUri,
    rarity: rarity,
    collectionId: collection.id,
  };
};

const extractFiles = async (pathToZip: string) => {
  const images: File[] = [];
  const metadatas: Metadata[] = [];
  const rarity: number[] = [];
  let ext: string = "";
  let imageIndex = 0;
  const originalImageNames: string[] = [];

  // Fill images and metadatas File arrays
  const zip = new StreamZip.async({ file: pathToZip });
  const entries = await zip.entries();
  for (const entry of Object.values(entries)) {
    if (entry.isDirectory)
      throw new ErrorException(ErrorCode.ZipContainsDirectories);
    const data = await zip.entryData(entry.name);
    const _ext = entry.name.split(".").pop() || "";
    if (ALLOWED_EXTENSIONS.includes(_ext)) {
      if (ext === "") ext = _ext;
      else if (ext !== _ext)
        throw new ErrorException(ErrorCode.ZipMixedImageExtensions);
      originalImageNames.push(entry.name);
      images.push(
        new File([data], `${eip1155Id(++imageIndex)}.${_ext}`, {
          type: `image/${_ext}`,
        })
      );
    } else if (_ext === "json") {
      const metadata = JSON.parse(data.toString()) as Metadata;
      // Use image field to store temorarily the name of the file
      metadata.image = path.parse(entry.name).name;
      // Check for valid rarity
      if (
        metadata.rarity &&
        (metadata.rarity < 1 ||
          metadata.rarity > 100 ||
          metadata.rarity % 1 !== 0)
      ) {
        throw new ErrorException(ErrorCode.InvalidRarity);
      }
      metadatas.push(metadata);
      rarity.push(metadata.rarity || 100);
    } else {
      throw new ErrorException(ErrorCode.ZipUnsopportedFileTypes);
    }
  }
  await zip.close();

  // Check if contents are valid
  if (!images.length) throw new ErrorException(ErrorCode.ZipNoImages);
  if (images.length > 1000) throw new ErrorException(ErrorCode.ZipTooManyItems);
  if (images.length !== metadatas.length)
    throw new ErrorException(ErrorCode.ZipImagesMetadataNumberUnmatched);
  originalImageNames.forEach((imageName) => {
    const match = metadatas.find(
      (metadata) => metadata.image === imageName.split(".").shift()
    );
    if (!match)
      throw new ErrorException(ErrorCode.ZipImagesMetadataNumberUnmatched);
  });

  return { images, metadatas, rarity, ext };
};

/* 
  Implementation of EIP-1155 ID specification (https://eips.ethereum.org/EIPS/eip-1155#metadata).
  The string format of the substituted hexadecimal ID MUST be lowercase alphanumeric: [0-9a-f] with no 0x prefix.
  The string format of the substituted hexadecimal ID MUST be leading zero padded to 64 hex characters length if necessary. 
*/
const eip1155Id = (id: number): string => {
  return id.toString(16).padStart(64, "0");
};
