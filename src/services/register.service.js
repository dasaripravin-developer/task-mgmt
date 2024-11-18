import UserModel from "../db/model/user.model.js";

/**
 * @author PRAVIN DASARI
 * @param {Object} data user registration object which contains user details
 * @returns {Promise<T>} will return either Error object or success message
 * @description It does the user registration into our system
 */
export async function userRegistration(data) {
  try {
    const findUser = await UserModel.findOne({ username: data.username });
    if (findUser) return `${data.username} already exist`;

    const user = new UserModel(data);
    await user.save();
    return "User registration success";
  } catch (err) {
    console.error(
      `services - register - userRegistration - exception - ${err}`
    );
    return err;
  }
}
