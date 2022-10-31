import jwt from "jsonwebtoken";

export const generateToken = (address: string): string => {
  return jwt.sign({ address }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME || "24 hours",
  });
};

export const verifyToken = (token: string): any => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as string;
    return { authenticated: true, data };
  } catch (error) {
    return { authenticated: false, error };
  }
};
