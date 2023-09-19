const express = require("express");
const router = express.Router();
const Heroes = require("../models/heroes");
const multer = require("multer");
const fs = require("fs/promises");

// image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + "_" + file.originalname
    );
  },
});

var upload = multer({
  storage: storage,
}).single("image");

// Insert a Hero into the Database route
router.post("/add", upload, async (req, res) => {
  try {
    const hero = new Heroes({
      nickname: req.body.nickname,
      real_name: req.body.real_name,
      origin_description: req.body.origin_description,
      superpowers: req.body.superpowers,
      catch_phrase: req.body.catch_phrase,
    });
    if (req.file) {
      hero.image = req.file.filename;
    }
    await hero.save();
    req.session.message = {
      type: "success",
      message: "Hero added successfully!",
    };
    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
});

// Get All Heroes route
router.get("/", async (req, res) => {
  try {
    const heroes = await Heroes.find();
    res.render("index", {
      title: "Heroes List",
      heroes: heroes,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/home", (req, res) => {
  res.render("index", { title: "Home Page" });
});

router.get("/add", (req, res) => {
  res.render("add_heroes", { title: "Add Hero" });
});

// Edit a hero route
router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const hero = await Heroes.findById(id);
    if (!hero) {
      res.redirect("/");
    } else {
      res.render("edit_heroes", {
        title: "Edit Hero",
        hero: hero,
      });
    }
  } catch (err) {
    res.redirect("/");
  }
});

// Update hero route
router.post("/update/:id", upload, async (req, res) => {
  try {
    const id = req.params.id;
    let new_image = req.body.old_image;
    if (req.file) {
      new_image = req.file.filename;
      try {
        await fs.unlink("./uploads/" + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    }

    await Heroes.findByIdAndUpdate(id, {
      nickname: req.body.nickname,
      real_name: req.body.real_name,
      origin_description: req.body.origin_description,
      superpowers: req.body.superpowers,
      catch_phrase: req.body.catch_phrase,
      image: new_image,
    });

    req.session.message = {
      type: "success",
      message: "Hero updated successfully!",
    };
    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
});

// Delete Hero route
router.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Heroes.findByIdAndRemove(id);
    if (result.image !== "") {
      try {
        await fs.unlink("./uploads/" + result.image);
      } catch (err) {
        console.log(err);
      }
    }

    req.session.message = {
      type: "info",
      message: "Hero deleted successfully!",
    };
    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
