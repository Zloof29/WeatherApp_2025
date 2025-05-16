import Joi from "joi";
import { Role } from "./enums";

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: Role;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  public static validationSchema = Joi.object({
    id: Joi.number().integer().positive(),
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(250).required(),
    roleId: Joi.number().valid(Role.User, Role.Admin).required(),
  });

  public validate(): Joi.ValidationResult {
    return UserModel.validationSchema.validate(this, { abortEarly: false });
  }
}
