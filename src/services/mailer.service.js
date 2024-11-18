import nodemailer from "nodemailer";
import appConfig from "../config/app.config.js";

const transporter = nodemailer.createTransport({
  service: appConfig.mailServiceName,
  secure: true,
  auth: {
    user: appConfig.from,
    pass: appConfig.appPassword,
  },
});

/**
 * @author PRAVIN DASARI
 * @description use to send a mail
 * @param {Object} data It contains mail receiver details
 *
 */
export async function sendMail(data) {
  let info = await transporter.sendMail({
    from: appConfig.from,
    to: typeof data.to != "string" ? data.to.toString() : data.to,
    subject: data.subject,
    text: data.body,
  });
  console.log(`service - mailer - sendMail - info - ${info}`);
}
