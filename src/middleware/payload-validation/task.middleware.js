import { createTask, updateTask } from "../../schema/task.schema.js";

export async function createTaskValidator(request, response, next) {
  const { error } = createTask.validate(request.body);
  console.log(error);
  if (error) return response.status(400).send(error.message);
  else next();
}

export async function updateTaskValidator(request, response, next) {
  const { error } = updateTask.validate(request.body);
  console.log(error);
  if (error) return response.status(400).send(error.message);
  else next();
}

export async function numberParamValidator(request, response, next) {
    console.log('value 1=> ', request.params.id)
    console.log('value => ', +request.params.id)
    if(Object.is(NaN, +request.params.id)) 
        return response.status(400).send('The task id should be number, please provide the number')
    next();
}
