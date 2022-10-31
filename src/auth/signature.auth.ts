import { ethers } from "ethers";
import { userRepository } from "../app";
import { generateToken } from "./jwt.auth";

const SIGN_MESSAGE = "Sign this message to authenticate in gotSwapz: ";

export const getNonce = async (address: string): Promise<{}> => {
  const nonce = Math.floor(Math.random() * 10000000);
  const user = await userRepository.findOne({ where: { address } });

  if (user) {
    await user.update({ nonce });
  } else {
    await userRepository.create({ address, nonce });
  }

  return { message: SIGN_MESSAGE + nonce };
};

export const verifySignature = async (
  address: string,
  signature: string
): Promise<{}> => {
  const user = await userRepository.findByPk(address);

  if (user) {
    const decodedAddress = ethers.utils.verifyMessage(
      SIGN_MESSAGE + user.nonce,
      signature
    );
    if (address.toLowerCase() === decodedAddress.toLowerCase()) {
      return {
        authenticated: true,
        token: generateToken(address),
        avatar: user.avatarUrl,
      };
    }
  }

  return {
    authenticated: false,
  };
};
