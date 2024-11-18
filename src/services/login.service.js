import UserModel from "../db/model/user.model.js";
import { sign } from "../helper/jwt.helper.js";

/**
 * @author PRAVIN DASARI
 * @param {Object} data Contains user login details
 * @returns {Promise<T>} Will return either token or undefined or Error object
 * @description It does the checking of user is authenticated or not
 */
export async function userLogin(data) {
  try {
    const user = await UserModel.findOne({ username: data.username });
    if (!user || !(await user.comparePassword(data.password))) {
      return;
    }
    return await sign({ ...user });
  } catch (error) {
    console.error(`services - user - userLogin - Exception - ${error}`);
    return error
  }
}
