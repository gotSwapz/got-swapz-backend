export class ErrorCode {
  public static readonly Unauthorized = "Unauthorized";
  public static readonly NotFound = "NotFound";
  public static readonly RequiredField = "RequiredField";
  public static readonly InvalidRarity = "InvalidRarity";
  public static readonly FileIsNotZip = "FileIsNotZip";
  public static readonly ZipUnsopportedFileTypes = "UnsopportedFileTypes";
  public static readonly ZipNoImages = "ZipNoImages";
  public static readonly ZipTooManyItems = "ZipTooManyItems";
  public static readonly ZipImagesMetadataNumberUnmatched =
    "ZipImagesMetadataNumberUnmatched";
  public static readonly ZipImagesMetadataNamesUnmatched =
    "ZipImagesMetadataNamesUnmatched";
  public static readonly ZipContainsDirectories = "ZipContainsDirectories";
  public static readonly ZipMixedImageExtensions = "ZipMixedImageExtensions";
  public static readonly S3UploadError = "S3UploadError";
  public static readonly UnexpectedError = "UnexpectedError";
}
