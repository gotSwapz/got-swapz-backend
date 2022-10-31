export type MetadataPropertyValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];

export interface MetadataProperty {
  key: string;
  value: MetadataPropertyValue;
}

/* 
 Implementation of EIP-1155 Metadata specification. Does not allow complex objects.
 (https://eips.ethereum.org/EIPS/eip-1155#metadata).
*/
export interface Metadata {
  name: string;
  description: string;
  image?: string | null;
  rarity?: number;
  properties?: MetadataProperty[];
}
