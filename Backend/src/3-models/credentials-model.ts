import Joi from "joi";

export class CredentialsModel {
  public email: string;
  public password: string;

  public constructor(user: CredentialsModel) {
    this.email = user.email;
    this.password = user.password;
  }

  public static validationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(250).required(),
  });

  public validate(): Joi.ValidationResult {
    return CredentialsModel.validationSchema.validate(this, {
      abortEarly: false,
    });
  }
}
