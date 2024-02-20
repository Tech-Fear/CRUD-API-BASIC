const mongoose=require('mongoose');
const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is mandatory"],
    },
    contact: {
      type: Number,
      required: [true, "Contact is mandatory"],
    },
    email: {
      type: String,
      required: [true, "Email is mandatory"],
    },
    fees: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Student=mongoose.model("Student",StudentSchema);
module.exports = Student;