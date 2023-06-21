const express = require("express");
const router = express.Router();
const multer = require("multer");
const Contact = require("../models/contact");

const upload = multer({ dest: "uploads/" });

// post the message from contact us page into mongo db
router.post("/", upload.single("file"), async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    let fileUrl = "";
    // you would use your file uploading service here to upload the file and get a URL
    // fileUrl = await uploadFile(req.file);

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message,
      fileUrl,
    });

    await newContact.save();

    res.json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
