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

const objectSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
});
const ObjectModel = mongoose.model("Object", objectSchema);

const requestFormModel = mongoose.model("Requests", requestFormSchema);

const requestFormDateModel = mongoose.model(
  "dateRequest",
  requestFormDateSchema
);

const requestFormFileModel = mongoose.model(
  "fileRequest",
  requestFormFileSchema
);

export default {
  ObjectModel,
  requestFormModel,
  requestFormDateModel,
  requestFormFileModel,
};
