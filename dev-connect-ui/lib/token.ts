import {
  getForgotPasswordTokenByEmail,
  getTokenByEmail,
  getTwoFactorTokenByEmail,
} from "@/data/token";
import { db } from "./db";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export const generateVerificationToken = async (email: string) => {
  const existingToken = await getTokenByEmail(email);

  if (existingToken)
    await db.confirmationToken.delete({ where: { id: existingToken.id } });

  const verificationToken = uuidv4();

  const confirmationToken = await db.confirmationToken.create({
    data: {
      email,
      token: verificationToken,
      expires: new Date(new Date().getTime() + 3600 * 1000),
    },
  });

  return confirmationToken;
};

export const generateForgotPasswordToken = async (email: string) => {
  const existingToken = await getForgotPasswordTokenByEmail(email);

  if (existingToken)
    await db.resetPasswordToken.delete({ where: { id: existingToken.id } });

  const verificationToken = uuidv4();

  const confirmationToken = await db.resetPasswordToken.create({
    data: {
      email,
      token: verificationToken,
      expires: new Date(new Date().getTime() + 3600 * 1000),
    },
  });

  return confirmationToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken)
    await db.twoFactorToken.delete({ where: { id: existingToken.id } });

  const verificationToken = crypto.randomInt(100_100, 1_000_000).toString();

  const confirmationToken = await db.twoFactorToken.create({
    data: {
      email,
      token: verificationToken,
      expires: new Date(new Date().getTime() + 3600 * 1000),
    },
  });

  return confirmationToken;
};
