import { Router } from "express";
import { register, login } from "../controllers/loginRegister.controller.js";
import { registerValidator, loginValidator } from "../middleware/payload-validation/user.middleware.js";
const loginRegister = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      UserRegistration:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - username
 *              - password
 *          properties:
 *              firstName:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 10
 *                  example: pravin
 *              lastName:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 10
 *                  example: dasari
 *              username:
 *                  type: string
 *                  minLength: 2
 *                  maxLength: 15
 *                  example: dasaripravin
 *              password:
 *                  type: string
 *                  minLength: 8
 *                  maxLength: 16
 *                  example: 12345678
 *      LoginPayload:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  minLength: 2
 *                  maxLength: 15
 *                  example: dasaripravin
 *              password:
 *                  type: string
 *                  minLength: 8
 *                  maxLength: 16
 *                  example: 12345678
 *  responses:
 *      InternalError:
 *          description: Internal server error
 *          content:
 *              'text/plain':
 *                  schema:
 *                      type: string
 *                      example: something went wrong, please try again later
 *      UserAlreadyExist:
 *          description: User already exist
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: dasaripravin123 already exist
 *      UserRegistrationSuccess:
 *          description: User registration success
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  properties:
 *                      message: 
 *                          type: string
 *                          example: User registration success
 *  parameters:
 *      X-Request-Source:
 *          name: X-Request-Source
 *          in: header
 *          description: Custom header to specify the source of the request (e.g., mobile-app, web-app)
 *          schema:
 *              type: string
 *              example: mobile-app
 * 
 * */

/** POST Methods */
/**
 * @swagger
 * /register:
 *  post:
 *     tags:
 *      - User Controller
 *     summary: Create a user
 *     parameters:
 *      - $ref: "#/components/parameters/X-Request-Source"
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: "#/components/schemas/UserRegistration"
 *     responses:
 *      200:
 *          description: Successful response
 *          content:
 *              application/json:
 *                  oneOf:
 *                      - $ref: "#/components/responses/UserAlreadyExist"
 *                      - $ref: "#/components/responses/UserRegistrationSuccess"
 *                      
 *      500:
 *          $ref: "#/components/responses/InternalError"
 */
loginRegister.post("/register", registerValidator, register);

/** POST Methods */
/**
 * @swagger
 * /login:
 *  post:
 *     tags:
 *      - User Controller
 *     summary: User login
 *     parameters:
 *      - $ref: "#/components/parameters/X-Request-Source"
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: "#/components/schemas/LoginPayload"
 *     responses:
 *      200:
 *        description: If provided credentials are valid then receive a token else receive invalid credentials message
 *      500:
 *          $ref: "#/components/responses/InternalError"
 */
loginRegister.post("/login", loginValidator, login);

export default loginRegister;
