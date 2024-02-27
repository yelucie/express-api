var express = require("express");
var router = express.Router();
var Contact = require("../models/contact");

/* GET (read) list of contacts. */
router.get("/", async function (req, res) {
  try {
    await Contact.find().then((contacts) => {
      if (contacts.length === 0) {
        res.status(404).json({ message: "No contacts found" });
      } else {
        res.send(contacts);
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

/* POST (create) a contact. */
router.post("/add", async function (req, res) {
  const { firstname, lastname } = req.body;

  if (!firstname || !lastname) {
    return res
      .status(400)
      .json({ message: "Please provide both a firstname and a lastname." });
  }

  const contact = new Contact({
    firstname,
    lastname,
  });

  try {
    await contact.save();
    res.json(contact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
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
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

/* DELETE a contact. */
router.delete("/delete/:uuid", async function (req, res) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.uuid);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* PUT (update) contact. */
router.put("/edit/:uuid", async function (req, res) {
  const updatedFields = {};
  const { firstname, lastname } = req.body;

  if (firstname) updatedFields.firstname = firstname;
  if (lastname) updatedFields.lastname = lastname;

  try {
    const result = await Contact.updateOne(
      { _id: req.params.uuid },
      updatedFields
    );

    if (result.n === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.json({ message: "Contact updated", contact: updatedFields });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

module.exports = router;
