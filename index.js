const mongoose = require("mongoose");
const express = require("express");
const Student = require("./models/student.model.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Testing the connection to the database API");
});
//Database Connection
mongoose
  .connect(
    "mongodb+srv://CRUD-API:<password>@apicrud.iac5dvj.mongodb.net/CRUDAPI?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connection is Successfully Established");
    //Listening to the server
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection to DataBase Failed");
    console.log(err);
  });
//Get All Students in JSON Format
app.get("/api/student", async (req, res) => {
  try {
    const student = await Student.find({});
    res.status(200).send(student);
    res.send(student);
  } catch (error) {
    res.status(500, { message: `Error occurred ${error.message}` });
  }
});
// Single Student using ID in JSON Format
app.get("/api/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.status(200).send(student);
  } catch (error) {
    res.status(500, { message: `Error occurred ${error.message}` });
  }
});
//Update Student using ID
app.put("api/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await findByIdandUpdate(id, req.body);
    if (!product) {
      return res.status(404).send({ message: `Student with ${id} not found` });
    }
    const checkUpdate = await Student.findById(id);
    try {
      res.status(200).send(checkUpdate);
    } catch {
      res.status(500).send({ message: `Error occurred ${error.message}` });
    }
  } catch (error) {
    res.sendStatus(500).send({ message: `Error occurred ${error.message}` });
  }
});
//Create Student
app.post("/api/student", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    console.log(req.body);
    res.send(`Data recieved successfully ${req.body}`);
  } catch (err) {
    res.status(500, { message: `Sending data failed ${err.message}` });
  }
});
// delete student using ID
app.delete("/api/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdandDelete(id);
    if (student) {
      res.status(200).send({ message: `Student with ${id} is deleted` });
    } else {
      return res.status(404).send({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).send({ message: `Error occurred ${error.message}` });
  }
});
