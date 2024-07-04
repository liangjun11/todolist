const { User, Todolist, Todo } = require('./models')
const express = require('express')

function appSetup(app) {
  app.use(express.json())

  app.get('/', (req, res) => {
    res.json({ result: 'Hello World!' })
  })

  app.post('/login', async (req, res) => {
    const name = req.body.name
    const user = await User.findOne({ name })
    try {
      if (user) {
        res.status(200).send(user)
      } else {
        const newUser = new User({ name })
        await newUser.save()
        res.status(200).send(newUser)
      }
    } catch (error) {
      console.error('Error on login:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })

  app.get('/user/:name/todolists', async (req, res) => {
    const { name } = req.params
    if (!name) {
      res.status(400).send({ result: 'name must be provided' })
    }

    try {
      const user = await User.findOne({ name }).populate({
        path: 'todolists',
        populate: {
          path: 'todos',
          model: 'Todo',
        },
      })
      res.status(200).send(user.todolists)
    } catch (error) {
      console.error('Error getting todolists:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })

  app.put('/todo/:id/state', async (req, res) => {
    const { id } = req.params
    const { state } = req.body

    const validStates = ['TODO', 'ONGOING', 'DONE']
    if (!validStates.includes(state)) {
      return res.status(400).json({ message: 'Invalid state value' })
    }
    try {
      const todo = await Todo.findByIdAndUpdate(
        id,
        { state, lastUpdateTime: Date.now() },
        { new: true },
      )

      if (!todo) {
        return res.status(404).json({ message: 'Todo item not found' })
      }

      res.status(200).json(todo)
    } catch (error) {
      console.error('Error updating todo state:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })

  app.post('/todolist/:todolistId/todo', async (req, res) => {
    const { todolistId } = req.params
    const { content, ownerName } = req.body

    try {
      const todolist = await Todolist.findById(todolistId)
      const owner = await User.findOne({ name: ownerName })

      if (!todolist) {
        return res.status(404).json({ message: 'Todolist not found' })
      }

      const newTodo = new Todo({
        content,
        owner: owner._id,
        lastUpdateTime: Date.now(),
        todolist: todolistId,
      })

      const savedTodo = await newTodo.save()

      todolist.todos.push(savedTodo._id)
      await todolist.save()

      res.status(201).json(savedTodo)
    } catch (error) {
      console.error('Error adding todo item:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })

  app.post('/todolist', async (req, res) => {
    const { ownerName, todolistName } = req.body

    try {
      const user = await User.findOne({ name: ownerName })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const newTodolist = new Todolist({
        owner: user._id,
        todos: [],
        name: todolistName,
      })

      const savedTodolist = await newTodolist.save()

      user.todolists.push(savedTodolist._id)
      await user.save()

      res.status(201).json(savedTodolist)
    } catch (error) {
      console.error('Error creating todolist:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })

  app.post('/user/:name/todolist/:todolistId', async (req, res) => {
    const { name, todolistId } = req.params

    try {
      const user = await User.findOne({ name })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const todolist = await Todolist.findById(todolistId)

      if (!todolist) {
        return res.status(404).json({ message: 'Todolist not found' })
      }

      if (!user.todolists.includes(todolistId)) {
        user.todolists.push(todolistId)
        await user.save()
      }

      res.status(200).json(user)
    } catch (error) {
      console.error('Error updating user todolists:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })
}

module.exports = appSetup
