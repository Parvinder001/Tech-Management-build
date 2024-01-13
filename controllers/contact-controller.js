const contact = require("../models/contact.model");

const contactFrom = async (request, response) => {
  try {
    const contactData = request.body;
    await contact.create(contactData);
    response.status(200).send({
      success: true,
      message: "Your Request  Successfully Submit",
    });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
};

module.exports = contactFrom;
