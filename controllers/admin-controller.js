const User = require("../models/user.model");
const Contact = require("../models/contact.model");
const Service = require("../models/service.model");
const UserList = async (request, response) => {
  const users = await User.find(
    {},
    {
      password: 0,
    }
  );
  if (!users || users.length === 0) {
    return response
      .status(404)
      .json({ success: false, message: "User not found" });
  }
  return response.status(200).json({ success: true, users });
};

const ContactQuery = async (request, response) => {
  const ContactList = await Contact.find();
  if (!ContactList) {
    return response
      .status(404)
      .json({ success: false, message: "Contact list not found" });
  }
  return response.status(200).json({ success: true, ContactList });
};

// THIS METHOD IS FOR ADD NEW SERVICE FORM ADMIN
const addService = async (request, response) => {
  const { service, description, price, provider } = request.body;
  const newService = new Service({
    service,
    description,
    price,
    provider,
  });
  const addNewService = await newService.save();
  if (!addNewService) {
    return response
      .status(404)
      .json({ success: false, message: "Service not added" });
  }
  return response
    .status(200)
    .json({ success: true, message: "Service added successfully" });
};

// THIS METHOD IS FOR DELETE USER BY ID
const deleteUserByID = async (request, response) => {
  try {
    const UserID = request.params.id;
    await User.findByIdAndDelete(UserID);
    return response
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// THIS METHOD IS FOR SINGLE USER BY ID
const singleUserDataByID = async (request, response) => {
  try {
    const UserID = request.params.id;
    const UserData = await User.findOne({ _id: UserID }, { password: 0 });
    return response.status(200).json({ success: true, userData: UserData });
  } catch (error) {
    console.log(error.message);
  }
};

// THIS METHOD IS FOR UPDATE USER BY ID
const updateUserByID = async (request, response) => {
  try {
    const UserID = request.params.id;
    const UpdateUserData = request.body;
    const updateUser = await User.updateOne(
      { _id: UserID },
      { $set: UpdateUserData }
    );
    return response.status(200).json({
      success: true,
      userData: UpdateUserData,
      message: "User updated successfully",
    });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
};

// THIS METHOD IS FOR DELETE CONTACT QUERY LIST AND
const deleteContactQueryList = async (request, response) => {
  try {
    const ListID = request.params.id;
    const DeleteList = await Contact.deleteOne({ _id: ListID });
    return response.status(200).json({
      success: true,
      DeleteList,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
module.exports = {
  UserList,
  ContactQuery,
  addService,
  deleteUserByID,
  singleUserDataByID,
  updateUserByID,
  deleteContactQueryList,
};
