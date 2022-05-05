const mongoose = require("mongoose");

//schema
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  lecNo: String,
  courseId: String,
  timeStamp: String,
  content: String,
  studentId: String,
  public: Boolean,
  edit: Boolean,
});

//model
const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
