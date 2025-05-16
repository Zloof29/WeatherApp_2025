import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { UserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/client-error";

class UserService {
  public async register(user: UserModel) {
    const userValidation = user.validate();

    if (userValidation.error) {
      throw new ValidationError(userValidation.error.message);
    }

    const sql = "insert into users values(default,?,?,?,?,?)";

    user.roleId = Role.User;

    user.password = cyber.hash(user.password);

    const values = [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roleId,
    ];

    const info: OkPacketParams = await dal.execute(sql, values);

    user.id = info.insertId;

    const token = cyber.generateNewToken(user);

    return token;
  }

  public async login(credentials: CredentialsModel) {
    const credentialsValidate = credentials.validate();

    if (credentialsValidate.error)
      throw new ValidationError(credentialsValidate.error.message);

    const sql = "select * from users where email = ? and password = ?";

    credentials.password = cyber.hash(credentials.password);

    const values = [credentials.email, credentials.password];

    const users = await dal.execute(sql, values);
    const user = users[0];

    if (!user) throw new UnauthorizedError("Incorrect email or password.");

    const token = cyber.generateNewToken(user);

    return token;
  }
}

export const userService = new UserService();
