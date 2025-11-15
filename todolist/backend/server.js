import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://rithikadakshinamoorthy:Anu2006@rithikaproject.bea0egh.mongodb.net/mytodo") // or your Atlas URI
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const TodoSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false }
});


const Todo = mongoose.model("Todo", TodoSchema);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  const saved = await newTodo.save();
  res.json(saved);
});


app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: true }, // set completed to true
    );

    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
