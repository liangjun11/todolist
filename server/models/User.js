const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  todolists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todolist',
    },
  ],
})

module.exports = mongoose.model('User', UserSchema)
