import Joi from "joi";
import { validateUser } from "../helpers/validateBody.js";

export const signUpSchema = validateUser((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: Joi.string().required().min(6),
    })
    .validate(data)
);

export const loginSchema = validateUser((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: Joi.string().required().min(6),
    })
    .validate(data)
);
