import jwt from 'jsonwebtoken'

/**
 * @author PRAVIN DASARI
 * @description to sign token
 * @param {object} data user object
 * @returns {string} generated token
 */
export async function sign(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
}

/**
 * @author PRAVIN DASARI
 * @description to verify token
 * @param {string} token authentication token
 * @returns {object} It return user object if token is valid else error object
 */
export async function verify(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch(err) {
        return err
    }
}