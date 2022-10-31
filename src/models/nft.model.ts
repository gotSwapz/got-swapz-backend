import { Metadata } from "./metadata.model";

export type MimeType = "image/jpeg" | "image/png" | "image/gif";

export interface Nft {
  image: File | Blob | null;
  name: string;
  description: string;
  mimeType: MimeType;
  properties: Metadata;
}
