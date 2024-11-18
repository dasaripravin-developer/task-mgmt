import * as taskService from "../services/task.service.js";

/**
 * @author PRAVIN DASARI
 * @param {Object} request request object of express framework 
 * @param {Object} response response object of express framework
 * @description It handle the insert new task operation
 * @returns {Object} It will return added task or error object
 */
export async function insertTask(request, response) {
  try {
    response.status(200).json(
      await taskService.addTask({
        ...request.body,
        userId: +request.userData.userId,
      })
    );
  } catch (error) {
    console.error(`controller - user - register - Exception - ${error}`);
    response.status(500).send({ message: error.message });
  }
}

/**
 * @author PRAVIN DASARI
 * @param {Object} request request object of express framework 
 * @param {Object} response response object of express framework
 * @description It handle to get task details by task id of user
 * @returns {Object} It will return task object or error object
 */
export async function getTaskById(request, response) {
  try {
    const task = await taskService.getTaskById(
      +request.params.id,
      +request.userData.userId
    );
    if (task) response.status(200).send(task);
    else response.status(200).send({ message: "task not found" });
  } catch (error) {
    console.error(`controller - user - getTaskById - Exception - ${error}`);
    response.status(500).json({ message: error.message });
  }
}

/**
 * @author PRAVIN DASARI
 * @param {Object} request request object of express framework 
 * @param {Object} response response object of express framework
 * @description It handle to update task details by task id for specific user
 * @returns {Object} It will return updated task object or failure object
 */
export async function updateTaskById(request, response) {
  try {
    const task = await taskService.updateTaskById(
      +request.params.id,
      +request.userData.userId,
      request.body
    );
    if (task) response.status(200).send(task);
    else response.status(200).json({ message: "task not found" });
  } catch (error) {
    console.error(`controller - user - updateTaskById - Exception - ${error}`);
    response.status(500).json({ message: error.message });
  }
}

/**
 * @author PRAVIN DASARI
 * @param {Object} request request object of express framework 
 * @param {Object} response response object of express framework
 * @description It handle to delete task by task id for specific user
 * @returns {Object} It will return deleted task object or failure object
 */
export async function deleteTaskById(request, response) {
  try {
    const task = await taskService.deleteTaskById(
      +request.params.id,
      +request.userData.userId
    );
    if (task) {
      response.status(200).send(task);
    } else
      response
        .status(400)
        .json({ message: `task not present for task id ${request.params.id}` });
  } catch (error) {
    console.error(`controller - user - deleteTaskById - Exception - ${error}`);
    response.status(500).json({ message: error.message });
  }
}

/**
 * @author PRAVIN DASARI
 * @param {Object} request request object of express framework 
 * @param {Object} response response object of express framework
 * @description It handle to get all task list of specific user
 * @returns {Array<Object> | Object} It will return array of task or error object
 */
export async function getTask(request, response) {
  try {
    let taskArr = await taskService.getTask(+request.userData.userId);
    if (taskArr) response.status(200).send(taskArr);
    else response.status(200).json({ message: "Tasks not found" });
  } catch (err) {
    console.error(`controller - user - getTask - Exception - ${err}`);
    response.status(500).json({ message: err.message });
  }
}
