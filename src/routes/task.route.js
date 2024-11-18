import { Router } from "express";
import {
  insertTask,
  getTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controller.js";
import {
  createTaskValidator,
  updateTaskValidator,
  numberParamValidator
} from "../middleware/payload-validation/task.middleware.js";

const taskRouter = Router();

/** POST Methods */
/**
 * @swagger
 * components:
 *  schemas:
 *    TaskResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          example: Swagger
 *        description:
 *          type: string
 *          example: RnD on swagger and implementation of it
 *        dueDate:
 *          type: string
 *          example: 20-11-2025
 *        status:
 *          type: string
 *          example: Completed
 *        userId:
 *          type: number
 *          example: 1
 *        createdAt:
 *          type: number
 *          example: 1731910336794
 *        updatedAt:
 *          type: number
 *          example: 1731910336794
 *        taskId:
 *          type: number
 *          example: 3

 *  requestBodies: 
 *    TaskPayload:
 *      type: object
 *      required:
 *      - title
 *      - description
 *      - dueDate
 *      properties:
 *        title:
 *          type: string
 *          minLength: 5
 *          maxLength: 100
 *          example: Swagger
 *        description:
 *          type: string
 *          minLength: 10
 *          maxLength: 250
 *          example: RnD on swagger and implementation of it
 *        dueDate:
 *          type: string
 *          example: 20-11-2024
 *        status:
 *          type: string
 *          enum: ["Pending", "Completed", "In Progress"]
 *          default: Pending
 *          example: Pending
 *  responses:
 *    UnauthorizedUser:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: jwt expire
 *    TokenNotProvided:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: Token not provided
 *    TokenExpire:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: jwt expire
 *  parameters:
 *    TaskIdParams:
 *      in: path
 *      name: id
 *      required: true
 *      description: It is task id and it required to get task object
 *      schema:
 *        type: integer
 *        example: 3
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      description: The authentication token needed to for authorized request
 *      in: header
 *      name: authorization
 *      scheme: bearer
 *      bearerFormat: JWT
 * security:
 *  - BearerAuth: []
 *
 */
 
 /**   
  * @swagger
 * /task:
 *  post:
 *     tags:
 *      - Task Controller
 *     summary: Create a task
 *     parameters:
 *      - $ref: "#/components/parameters/X-Request-Source"
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *      description: The request payload to create new task
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/requestBodies/TaskPayload"
 *     responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/TaskResponse"
 *      401:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/responses/UnauthorizedUser"
 *      500:
 *        $ref: "#/components/responses/InternalError"
 */
taskRouter.post("/", createTaskValidator, insertTask);

/**
 * @swagger
 * /task:
 *  get:
 *     tags:
 *      - Task Controller
 *     summary: Get all task
 *     parameters:
 *      - $ref: "#/components/parameters/X-Request-Source"
 *     security:
 *      - BearerAuth: []
 *     responses:
 *      200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                    $ref: "#/components/schemas/TaskResponse"
 *      401:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/responses/UnauthorizedUser"
 *      500:
 *        $ref: "#/components/responses/InternalError"
 */

taskRouter.get("/", getTask);

/**
 * @swagger
 * /task/{id}:
 *  get:
 *    tags:
 *      - Task Controller
 *    summary: Get task by task id
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - $ref: "#/components/parameters/TaskIdParams"
 *      - $ref: "#/components/parameters/X-Request-Source"
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/TaskResponse"
 *      401:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/responses/UnauthorizedUser"
 *      500:
 *        $ref: "#/components/responses/InternalError"
 */
taskRouter.get("/:id", numberParamValidator, getTaskById);

/**
 * @swagger
 * /task/{id}:
 *  put:
 *    tags:
 *      - Task Controller
 *    summary: Update task details by task id
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - $ref: "#/components/parameters/TaskIdParams"
 *      - $ref: "#/components/parameters/X-Request-Source"
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: swagger basic
 *                minLength: 5
 *                maxLength: 100
 *              status:
 *                type: string
 *                example: Completed
 *              dueDate:
 *                type: string
 *                enum: ["Pending", "Completed", "In Progress"]
 *                example: 22-11-2025
 *              description:
 *                type: string
 *                minLength: 10
 *                maxLength: 250
 *                example: Implementation of swagger doc
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/TaskResponse"
 *      401:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/responses/UnauthorizedUser"
 *      500:
 *        $ref: "#/components/responses/InternalError"
 */
taskRouter.put("/:id", numberParamValidator, updateTaskValidator, updateTaskById);

/**
 * @swagger
 * /task/{id}:
 *  delete:
 *    tags:
 *      - Task Controller
 *    summary: Delete task by task id
 *    security:
 *      - BearerAuth: []
 *    parameters:
 *      - $ref: "#/components/parameters/TaskIdParams"
 *      - $ref: "#/components/parameters/X-Request-Source"
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/TaskResponse"
 *      401:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/responses/UnauthorizedUser"
 *      500:
 *        $ref: "#/components/responses/InternalError"
 */
taskRouter.delete("/:id", numberParamValidator, deleteTaskById);

export default taskRouter;
