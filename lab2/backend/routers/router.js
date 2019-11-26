const express = require("express");
const router = express.Router();

const Robot = require("../models/Robot");

router.get("/", async (req, res) => {
  try {
    const robots = await Robot.findAll({ order: [["id", "DESC"]] });

    res.json({ robots });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, code, time, trajectory } = req.body;
    const robot = {
      name,
      code,
      time,
      trajectory
    };

    const newRobot = await Robot.create(robot);

    res.json({ newRobot });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Robot.destroy({
      where: { id }
    });

    res.json({ message: "Robot was deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
