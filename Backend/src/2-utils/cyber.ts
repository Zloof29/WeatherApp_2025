import jwt, { SignOptions } from "jsonwebtoken";
import { UserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";
import crypto from "crypto";

class Cyber {
  private secretKey = "TheAmazing4578-99Students!";

  private hashingSalt = "MakeThingsGoRight!!!";

  public hash(plainText: string): string {
    return crypto
      .createHmac("SHA-512", this.hashingSalt)
      .update(plainText)
      .digest("hex");
  }

  public generateNewToken(user: UserModel): string {
    const userCopy = JSON.parse(JSON.stringify(user));

    delete userCopy.password;

    const options: SignOptions = { expiresIn: "3h" };

    const token = jwt.sign(userCopy, this.secretKey, options);

    return token;
  }

  public isTokenValid(token: string): boolean {
    try {
      if (!token) return false;

      jwt.verify(token, this.secretKey);

      return true;
    } catch (error: any) {
      return false;
    }
  }

  public isAdmin(token: string): boolean {
    try {
      const container = jwt.decode(token) as UserModel;

      const user = container;

      return user.roleId === Role.Admin;
    } catch (error: any) {
      return false;
    }
  }
}

export const cyber = new Cyber();
