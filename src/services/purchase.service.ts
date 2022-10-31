import { purchaseRepository } from "../app";
import { ErrorCode } from "../errors/error-code";
import { ErrorException } from "../errors/error-exception";

export const create = async (
  requestId: string,
  buyer: string,
  collectionAddress: string,
  units: number
): Promise<void> => {
  try {
    await purchaseRepository.create({
      requestId,
      buyer,
      collectionAddress,
      units,
      processed: false,
    });
  } catch (err: any) {
    if (err.errors?.length) {
      throw new Error(err.errors[0].message);
    } else {
      throw new Error(err.message);
    }
  }
};

export const updateProcessed = async (requestId: string): Promise<void> => {
  const purchase = await purchaseRepository.findByPk(requestId);
  if (!purchase) throw new ErrorException(ErrorCode.NotFound);
  try {
    await purchase.update({ processed: true });
  } catch (err: any) {
    if (err.errors.length) {
      throw new Error(err.errors[0].message);
    } else {
      throw new Error(err.message);
    }
  }
};

export const isProcessed = async (
  requestId: string
): Promise<{ processed: boolean }> => {
  const purchase = await purchaseRepository.findByPk(requestId);
  return { processed: purchase?.processed || false };
};
