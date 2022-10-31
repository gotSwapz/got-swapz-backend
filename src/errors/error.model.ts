export class ErrorModel {
  public code: string;
  public status: number;
  public metaData?: any;

  constructor(code: string, status: number, metaData?: any) {
    this.code = code;
    this.status = status;
    this.metaData = metaData;
  }
}
