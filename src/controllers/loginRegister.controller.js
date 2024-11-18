import { userLogin } from "../services/login.service.js";
import { userRegistration } from "../services/register.service.js";

/**
 * @author PRAVIN DASARI
 * @param {Object} request request object of express framework
 * @param {Object} response response object of express framework
 * @description It handle the user registration process
 * @returns {string} It will return success or failure message
 */
export async function register(request, response) {
  try {
    response.status(200).send(await userRegistration(request.body));
  } catch (err) {
    console.error(
      `controllers - loginRegister - register - exception - ${err}`
    );
    response.status(500).send(`something went wrong, please try again later`);
  }
}

/**
 * @author PRAVIN DASARI
 * @param {Object} request request object of express framework
 * @param {Object} response response object of express framework
 * @description It handle the user login process
 * @returns {string} It will return token or error message
 */
export async function login(request, response) {
  try {
    const token = await userLogin(request.body);
    if (token) response.status(200).send(token);
    else response.status(200).send("Invalid credentials");
  } catch (err) {
    console.error(`controllers - loginRegister - login - exception - ${err}`);
    response.status(500).send(`something went wrong, please try again later`);
  }
}
