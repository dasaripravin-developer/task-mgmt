import { registerSchema, loginSchema } from "../../schema/user.schema.js";

export async function registerValidator(request, response, next) {
     const { error } = registerSchema.validate(request.body);
     console.log(error)
     if (error) return response.status(400).send(error.message);
     else next();
}

export async function loginValidator(request, response, next) {
     const { error } = loginSchema.validate(request.body);
     if (error) return response.status(400).send(error.message);
     else next();
}