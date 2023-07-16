import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is Required !!"],
  },
  publication_date: {
    type: String,
    required: [true, "Publication date is Required !!"],
  },
  summary: String,

  content: {
    type: String,
    required: [true, "Content is Required !!"],
  },
  comments: [],
});

export const Blogs = mongoose.models.blogs || mongoose.model("blogs", BlogSchema);


  