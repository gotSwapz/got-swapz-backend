export const collectionAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "serviceFee_",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
      {
        internalType: "uint8[]",
        name: "packageUnits_",
        type: "uint8[]",
      },
      {
        internalType: "uint256[]",
        name: "packagePrices_",
        type: "uint256[]",
      },
      {
        internalType: "uint8[]",
        name: "rarity_",
        type: "uint8[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_EmptyName",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_EmptyRariry",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_EmptyUri",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_InvalidNumOfPackages",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_InvalidNumberOfItems",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_InvalidPackagePrice",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_InvalidPackageUnits",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_InvalidRarityValue",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_InvalidValueSent",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_NotDemandedOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_NotOfferOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_NotOpenOffer",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_NotOwnerOfAll",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_PendingOrderNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_SenderNotGotSwapzFactory",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_SwapNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "GotSwapzCollection_TransferFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "units",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "OrderCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "nfts",
        type: "uint256[]",
      },
    ],
    name: "OrderProcessed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "swapId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "ownerA",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "ownerB",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "nftsA",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "nftsB",
        type: "uint256[]",
      },
    ],
    name: "SwapOfferCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "swapId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum GotSwapzCollection.SwapState",
        name: "state",
        type: "uint8",
      },
    ],
    name: "SwapOfferUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "swapId",
        type: "uint256",
      },
    ],
    name: "acceptSwapOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "owners",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "units",
        type: "uint8",
      },
    ],
    name: "buyPackage",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "swapId",
        type: "uint256",
      },
    ],
    name: "cancelSwapOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "nftsOffered",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "nftsDemanded",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "createSwapOffer",
    outputs: [
      {
        internalType: "uint256",
        name: "swapId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPackageInfo",
    outputs: [
      {
        internalType: "uint8[]",
        name: "packageUnits",
        type: "uint8[]",
      },
      {
        internalType: "uint256[]",
        name: "packagePrices",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRarity",
    outputs: [
      {
        internalType: "uint8[]",
        name: "",
        type: "uint8[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "swapId",
        type: "uint256",
      },
    ],
    name: "getSwap",
    outputs: [
      {
        internalType: "address",
        name: "ownerA",
        type: "address",
      },
      {
        internalType: "address",
        name: "ownerB",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "nftsA",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "nftsB",
        type: "uint256[]",
      },
      {
        internalType: "enum GotSwapzCollection.SwapState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    name: "processOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "swapId",
        type: "uint256",
      },
    ],
    name: "rejectSwapOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "swapCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
