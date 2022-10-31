import fs from "fs";
import md5 from "md5";
import { ErrorCode } from "../errors/error-code";
import { ErrorException } from "../errors/error-exception";

export const upload = (
  data: string,
  fileName: string,
  currentChunkIndex: number,
  totalChunks: number,
  ip: string
) => {
  const storagePath = process.env.STORAGE_PATH || "./uploads/";

  const firstChunk = currentChunkIndex === 0;
  const lastChunk = currentChunkIndex === totalChunks - 1;
  const ext = fileName.split(".").pop();
  if (ext !== "zip") throw new ErrorException(ErrorCode.FileIsNotZip);

  const buffer = Buffer.from(data, "base64");
  const tmpFilename = "tmp_" + md5(fileName + ip) + "." + ext;

  if (firstChunk && fs.existsSync(storagePath + tmpFilename)) {
    fs.unlinkSync(storagePath + tmpFilename);
  }

  fs.appendFileSync(storagePath + tmpFilename, buffer);

  if (lastChunk) {
    const finalFilename = tmpFilename.replace("tmp_", "");
    fs.renameSync(storagePath + tmpFilename, storagePath + finalFilename);
    return { filename: finalFilename };
  } else {
    return "ok";
  }
};
