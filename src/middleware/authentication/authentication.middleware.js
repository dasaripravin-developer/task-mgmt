import { verify } from "../../helper/jwt.helper.js";

/**
 * @author PRAVIN DASARI
 * @description Checking of API authentication
 * @param {Object} request request object from express framework
 * @param {Object} response response object from express framework
 * @param {function} next It is call function from express framework
 * @return {object} It will return 401 status code with error object if authentication failed
 */
export async function authentication(request, response, next) {
  try {
    const token = request.headers?.authorization?.split(" ")[1];
    if (!token)
      return response.status(401).json({ message: "Token not provided" });
    const decoded = await verify(token);
    if (decoded instanceof Error)
      return response.status(401).json({ message: decoded.message });
    request.userData = decoded._doc;
    next();
  } catch (err) {
    console.error(`middleware - authorization - exception - ${err.message}`);
    response.status(401).json({ message: err.message });
  }
}

export async function headerChecking(request, response, next) {
  if (request.headers?.['x-request-source'])
     console.log(`request source ${request.headers['x-request-source']} for ${request.path} request`)
  next()
}
