import { TaskModel } from "../db/model/task.model.js";
import { get, set, del, getKeys } from "./redis.service.js";
import { sendMail } from "./mailer.service.js";
import async from "async";

/**
 * @author PRAVIN DASARI
 * @description add task into database
 * @param {Object} data task object
 * @returns {Object} It return inserted task object or error object
 */
export async function addTask(data) {
  return new Promise((resolve, reject) => {
    try {
      console.log(data);
      (async () => {
        const task = new TaskModel(data);
        let insertedTask;
        insertedTask = await task.save();
        resolve(insertedTask);
        sendMail({
          to: "firote6610@lineacr.com",
          subject: `Task added - ${insertedTask.taskId}`,
          body: `${JSON.stringify(insertedTask)}`,
        });
        set(`user:${insertedTask.userId}:task:${insertedTask.taskId}`, task);
      })();
    } catch (err) {
      console.error(`services - task - addTask - Exception - ${err}`);
      reject(err);
    }
  });
}

/**
 * @author PRAVIN DASARI
 * @description get task by task id of specific user
 * @param {number} id It is task id
 * @param {number} userId It is user id
 * @returns {Object} It return task object or error object
 */
export async function getTaskById(id, userId) {
  try {
    let task;
    task = await get(`user:${userId}:task:${id}`);
    if (!task) {
      task = await TaskModel.findOne({ taskId: id, userId }).exec();
      if (task) await set(`user:${userId}:task:${id}`, task);
    }
    return task;
  } catch (err) {
    console.error(`services - task - geTaskById - Exception - ${err}`);
    return err;
  }
}

/**
 * @author PRAVIN DASARI
 * @description It used to update task details by task id for specific use
 * @param {number} id It is task id
 * @param {number} userId It is user id
 * @param {Object} data update object
 * @returns {Object} It will return updated task object or undefined or error object
 */
export async function updateTaskById(id, userId, data) {
  try {
    console.log(`services - task - updateTaskById - id - ${id}`);
    const task = await TaskModel.findOneAndUpdate(
      { taskId: id, userId },
      { $set: data },
      { new: true }
    ).exec();
    if (!task) return undefined;
    await set(`user:${task.userId}:task:${task.taskId}`, task);
    console.log(`services - task - updateTaskById - id - ${id} task updated`);
    return task;
  } catch (err) {
    console.error(`services - task - updateTaskById - Exception - ${err}`);
    return err;
  }
}

/**
 * @author PRAVIN DASARI
 * @description delete task by task id for specific user
 * @param {number} id It is task id
 * @param {number} userId It is user id
 * @returns {Object} It return deleted task object or undefined or error object
 */
export async function deleteTaskById(id, userId) {
  try {
    console.log(`services - task - deleteTaskById - id - ${id}`);
    const task = await TaskModel.findOneAndDelete({
      taskId: id,
      userId,
    }).exec();
    if (!task) return undefined;
    await del(`user:${task.userId}:task:${task.taskId}`);
    console.log(`services - task - deleteTaskById - id - ${id} - task deleted`);
    return task;
  } catch (err) {
    console.error(`services - task - deleteTaskById - Exception - ${err}`);
    return err;
  }
}

/**
 * @author PRAVIN DASARI
 * @description get all tasks of specific user
 * @param {number} userId It is user id
 * @returns {Array<Object>} It return array of task objects or undefined or error object
 */
export async function getTask(userId) {
  try {
    console.log(`services - task - getTask - ${userId}`);
    let keys = await getKeys(`user:${userId}:*`);
    if (keys && keys.length != 0) return await getTaskObject(keys);

    let taskArray = (await TaskModel.find({ userId }).exec()) || undefined;
    if (taskArray) insertTaskInCache(taskArray);
    return taskArray;
  } catch (err) {
    console.error(`services - task - getTask - Exception - ${err}`);
    return err;
  }
}

/**
 * @author PRAVIN DASARI
 * @description get task objects from redis
 * @param {array<string>} all keys which want to get data from redis
 * @returns {array<Object>} It will return array of task object
 */
async function getTaskObject(keys) {
  return new Promise((resolve, reject) => {
    const taskArr = [];
    async.parallel(
      keys.map((key) => {
        return async function (cb) {
          taskArr.push(await get(key));
          cb(null);
        };
      }),
      (error) => resolve(taskArr)
    );
  });
}

/**
 * @author PRAVIN DASARI
 * @description insert task object in redis cache
 * @param {Array<Object>} tasks array of task object
 */
async function insertTaskInCache(tasks) {
  async.parallel(
    tasks.map((task) => {
      return async (cb) =>
        cb(null, await set(`user:${task.userId}:task:${task.taskId}`, task));
    }),
    () => console.log(`insertTaskInCache - all tasks set in redis`)
  );
}
