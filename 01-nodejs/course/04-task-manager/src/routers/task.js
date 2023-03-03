const { Router } = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).send();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) return res.status(400).send({ error: "Invalid Updates!" });

  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    task.save();
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
