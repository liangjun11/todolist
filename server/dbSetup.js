const mongoose = require('mongoose')
// const { User, Todolist, Todo } = require('./models')

main().catch((err) => console.log(err))
async function main() {
  await mongoose.connect(
    process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/test',
  )

  // const user = new User({ name: 'Alice' })
  // await user.save()

  // // Example: Create a todolist for the user
  // for (let i = 0; i < 30; i++) {
  //   const todolist = new Todolist({ owner: user._id, name: `Test${i}` })
  //   await todolist.save()

  //   const todo = new Todo({
  //     todolist: todolist._id,
  //     content: 'Buy groceries',
  //     state: 'TODO',
  //     owner: user._id,
  //     lastUpdateTime: new Date(),
  //   })
  //   await todo.save()

  //   const todo2 = new Todo({
  //     todolist: todolist._id,
  //     content: 'Buy water',
  //     state: 'ONGOING',
  //     owner: user._id,
  //     lastUpdateTime: new Date(),
  //   })
  //   await todo2.save()

  //   const todo3 = new Todo({
  //     todolist: todolist._id,
  //     content: 'Buy meat',
  //     state: 'DONE',
  //     owner: user._id,
  //     lastUpdateTime: new Date(),
  //   })
  //   await todo3.save()

  //   // Add todo to todolist
  //   todolist.todos.push(todo._id)
  //   todolist.todos.push(todo2._id)
  //   todolist.todos.push(todo3._id)
  //   await todolist.save()

  //   // Add todolist to user
  //   user.todolists.push(todolist._id)
  // }

  // await user.save()
  // console.log('Data saved successfully')
}
