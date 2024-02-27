var express = require("express");
var router = express.Router();
var Contact = require("../models/contact");
const { default: mongoose } = require("mongoose");

/* GET (read) list of contacts. */
router.get("/", async function (req, res) {
  await Contact.find().then((contacts) => {
    res.send(contacts);
  });
});

/* POST (create) a contact. */
router.post("/add", async function (req, res) {
  const { firstname, lastname, email, notes } = req.body;
  const contact = new Contact({
    firstname,
    lastname,
    email,
    notes,
  });
  await contact.save().then(() => {
    res.json(contact);
  });
});

/* GET (read) a single contact. */
router.get("/:uuid", async function (req, res) {
  try {
    const contact = await Contact.findById(req.params.uuid);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* DELETE a contact. */
router.delete("/delete/:uuid", async function (req, res) {
  try {
    const contact = await Contact.findById(req.params.uuid);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
    await contact.remove();
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/* PUT (update) contact. */
router.put("/edit/:uuid", async function (req, res) {
  const updatedFields = {};
  const { firstname, lastname, email, notes } = req.body;
  if (firstname) updatedFields.firstname = firstname;
  if (lastname) updatedFields.lastname = lastname;
  if (email) updatedFields.email = email;
  if (notes) updatedFields.notes = notes;

  Contact.updateOne(
    { _id: req.params.uuid },
    updatedFields,
  ).then(() => {
    res.json({ message: "Contact updated", contact: updatedFields });
  });
});

module.exports = router;
