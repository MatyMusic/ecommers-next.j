import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "חייבים להיות לפחות 2 תווים"],
    maxlength: [32, "חייב להיות לפחות 2 תווים"],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  parent: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
});

const SubCategory =
  mongoose.models.SubCategory || mongoose.model("SubCategory", subSchema);

export default SubCategory;
