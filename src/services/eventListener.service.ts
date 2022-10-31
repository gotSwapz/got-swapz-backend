import { BigNumber, ethers, EventFilter, utils } from "ethers";
import { collectionAbi } from "../resources/collectionAbi";
import * as userService from "./user.service";
import * as purchaseService from "./purchase.service";

export const listenToEvents = (): void => {
  let rpcUrl: string;
  switch (process.env.NETWORK) {
    case "local":
      rpcUrl = process.env.LOCAL_RPC_URL!;
      break;
    case "testnet":
      rpcUrl = process.env.MUMBAI_RPC_URL!;
      break;
    default:
      rpcUrl = process.env.MAINNET_RPC_URL!;
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const iCollection = new ethers.utils.Interface(collectionAbi);

  const orderCreatedFilter: EventFilter = {
    topics: [utils.id("OrderCreated(address,uint8,uint256)")],
  };
  provider.on(orderCreatedFilter, (log) => {
    const decodedLog = iCollection.decodeEventLog(
      "OrderCreated",
      log.data,
      log.topics
    );
    purchaseService.create(
      decodedLog.requestId.toString(),
      decodedLog.buyer,
      log.address,
      Number(decodedLog.units)
    );
  });

  const orderProcessedFilter: EventFilter = {
    topics: [utils.id("OrderProcessed(address,uint256,uint256[])")],
  };
  provider.on(orderProcessedFilter, (log) => {
    const decodedLog = iCollection.decodeEventLog(
      "OrderProcessed",
      log.data,
      log.topics
    );
    userService.addNftsByCollectionIds(
      decodedLog.buyer,
      log.address,
      decodedLog.nfts.map((nftId: BigNumber) => Number(nftId)),
      decodedLog.requestId.toString()
    );
  });
};
