import jwt, { SignOptions } from "jsonwebtoken";
import { UserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";
import crypto from "crypto";

class Cyber {
  private secretKey = "TheAmazing4578-99Students!";

  private hashingSalt = "MakeThingsGoRight!!!";

  public hash(plainText: string): string {
    return crypto
      .createHmac("sha512", this.hashingSalt)
      .update(plainText)
      .digest("hex");
  }

  public generateNewToken(user: UserModel): string {
    delete user.password;

    const container = { user };

    const options: SignOptions = { expiresIn: "3h" };

    const token = jwt.sign(container, this.secretKey, options);

    return token;
  }

  public isTokenValid(token: string): boolean {
    try {
      if (!token) return false;

      jwt.verify(token, this.secretKey);

      return true;
    } catch (err: any) {
      return false;
    }
  }

  public isAdmin(token: string): boolean {
    try {
      const container = jwt.decode(token) as { user: UserModel };

      const user = container.user;

      return user.roleId === Role.Admin;
    } catch (err: any) {
      return false;
    }
  }
}

export const cyber = new Cyber();
