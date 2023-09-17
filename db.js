import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => {
    console.log("conection succesfull");
  })
  .catch((err) => {
    console.log(err);
  });

const requestFormFileSchema = new mongoose.Schema({
  tel: {
    type: String,
    required: true,
  },
  text: String,
  file: {
    name: String,
    data: Buffer,
    contentType: String,
  },
});

const requestFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  text: String,
});

const requestFormDateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: String,
    required: true,
  },
  text: String,
});

const imageObjectSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
});

const objectSchema = new mongoose.Schema({
  image: [imageObjectSchema],
  title: String,
  description: String,
  completeDate: String,
  status: Boolean,
});

const reviewSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
});

const projectInfoSchema = new mongoose.Schema({
  buildingTime: String,
  budget: String,
  designTime: String,
  square: String,
});

const ObjectModel = mongoose.model("Object", objectSchema);

const ProjectInfoModel = mongoose.model("ProjectInfo", projectInfoSchema);

const requestFormModel = mongoose.model("Requests", requestFormSchema);

const requestFormDateModel = mongoose.model(
  "dateRequest",
  requestFormDateSchema
);

const requestFormFileModel = mongoose.model(
  "fileRequest",
  requestFormFileSchema
);

const reviewModel = mongoose.model("Review", reviewSchema);

export default {
  ObjectModel,
  ProjectInfoModel,
  requestFormModel,
  requestFormDateModel,
  requestFormFileModel,
  reviewModel,
};
