const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
  todolist: {
    type: Schema.Types.ObjectId,
    ref: 'Todolist',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ['TODO', 'ONGOING', 'DONE'],
    default: 'TODO',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lastUpdateTime: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Todo', TodoSchema)
