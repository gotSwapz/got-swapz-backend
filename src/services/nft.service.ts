import { collectionRepository, nftRepository, userRepository } from "../app";
import { NftDao } from "../database/nft.dao";
import { ErrorCode } from "../errors/error-code";
import { ErrorException } from "../errors/error-exception";
import { MetadataProperty } from "../models/metadata.model";

export const get = async (id: number): Promise<NftDao> => {
  const nft = await nftRepository.findByPk(id, {
    include: [userRepository, collectionRepository],
  });

  if (!nft) throw new ErrorException(ErrorCode.NotFound);

  const properties: MetadataProperty[] = [];
  for (let key in nft.properties) {
    // @ts-ignore
    properties.push({ key, value: nft.properties[key] });
  }
  nft.properties = properties;

  return nft;
};
