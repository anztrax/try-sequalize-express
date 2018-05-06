import models from '../models';

const todoItemsController = {
  create : (req,res) => {
    return models.TodoItem.create({
      content: req.body.content,
      todoId: req.params.todoId,
    }).then(todoItem => {
      return res.status(200).send(todoItem);
    }).catch(error => {
      return res.status(400).send(error);
    });
  },
  update: (req, res) => {
    return models.TodoItem
      .find({
        where : {
          id : req.params.todoItemId,
          todoId : req.params.todoId
        }
      })
      .then(todoItem => {
        if(!todoItem){
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }

        return todoItem
          .update({
            content: req.body.content || todoItem.content,
            complete: req.body.complete || todoItem.complete,
          })
          .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy: (req, res) => {
    return models.TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }

        return todoItem
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};

export default todoItemsController;