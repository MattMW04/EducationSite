import mongoose from 'mongoose';


const exampleSchema = new mongoose.Schema({
  Example1: {
    type: String,
    required: true,
    unique: true, 
  },
  Example:{
    type: String,
    required: true,
  },
});


const Example = mongoose.models.ExampleModel || mongoose.model('Example', exampleSchema);

export default Example;
