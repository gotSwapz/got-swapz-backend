import { ErrorCode } from "./error-code";

export class ErrorException extends Error {
  public status: number;
  public metaData: any;

  constructor(code: string = ErrorCode.UnexpectedError, metaData: any = null) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = 500;
    this.metaData = metaData;
    switch (code) {
      case ErrorCode.Unauthorized:
        this.status = 401;
        break;
      case ErrorCode.RequiredField:
      case ErrorCode.InvalidRarity:
      case ErrorCode.FileIsNotZip:
      case ErrorCode.ZipUnsopportedFileTypes:
      case ErrorCode.ZipNoImages:
      case ErrorCode.ZipTooManyItems:
      case ErrorCode.ZipImagesMetadataNumberUnmatched:
      case ErrorCode.ZipImagesMetadataNamesUnmatched:
      case ErrorCode.ZipContainsDirectories:
      case ErrorCode.ZipMixedImageExtensions:
        this.status = 400;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}
