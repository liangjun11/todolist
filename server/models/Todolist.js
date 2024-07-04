const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodolistSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
  name: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Todolist', TodolistSchema)
