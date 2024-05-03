import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;

export const validateUser = (schema) => (data) => {
  const { error, value } = schema(data);

  if (!error) return { value };

  return {
    value,
    errors: error.details.map((err) => err.message),
  };
};