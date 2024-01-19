const { Vendor, User } = require("../models");
const { sendSecretCode, sellerCenter } = require("../middlewares/Verification");
const API = "http://localhost:5000";
const bcrypt = require("bcrypt");
const { newUser } = require("./UserController");

// HELPER METHOD TO GENERATE RANDOM STRINGS
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!&";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const vendorController = {
  getVendors: async (req, res) => {
    try {
      const vendors = await Vendor.findAll();
      if (!vendors || vendors.length === 0) {
        return res.status(404).send({ error: "No Vendors Found" });
      } else {
        return res.status(200).json(vendors);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  

  getVendorById: async (req, res) => {
    const { id } = req.params;
    try {
      const vendor = await Vendor.findByPk(id);
      if (!vendor) {
        return res.status(404).send({ error: "Vendor Not Found" });
      } else {
        return res.status(200).json(vendor);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  selfRegistration: async (req, res) => {
    const { companyEmail } = req.body;
   console.log(req.body);
    try {
      // Check if a user with the given companyEmail already exists
      const existingUser = await User.findOne({
        where: { email: companyEmail },
      });
      if (existingUser) {
        return res
          .status(409)
          .send({ error: "company email already registered" });
      }

      const randomString = generateRandomString(20);
      sendSecretCode({
        email: companyEmail,
        secretCode: `http://localhost:3000/vendors/${randomString}`,
      });
      const createdVendor = await Vendor.create({
        companyEMail: companyEmail,
        secretCode: randomString,
      });

      console.log("Send mails");
      return res.status(201).json(createdVendor);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  createVendor: async (req, res) => {
    const {
      companyEmail,
      companyName,
      location,
      AddressOne,
      username,
      contact,
    } = req.body;
    console.log(req.body);

    try {
      // Check if a user with the given companyEmail already exists
      const existingUser = await User.findOne({
        where: { email: companyEmail },
      });
      if (existingUser) {
        return res
          .status(409)
          .send({ error: "company email already registered" });
      }

      // Generate a random string for additional security
      const randomString = generateRandomString(20);

      // Find the id of the last user
      const lastUser = await User.findOne({
        order: [["id", "DESC"]],
      });
      // Set a default password for the user
      const password = "123456";
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const userDataInfo = {
        name: username,
        email: companyEmail,
        role: "Vendor",
        refreshToken: null,
        status: "pending",
        password: hashedPassword,
        id: lastUser ? lastUser.id + 1 : 1,
      };
      const createdUser = await newUser(userDataInfo, password);

      // Create a new vendor
      const createdVendor = await Vendor.create({
        companyEMail: companyEmail,
        city: location,
        companyName,
        AddressOne,
        username,
        userId: createdUser.id,
        MpesaNumber: contact,
      });

      // Send a welcome email to the new vendor
      sellerCenter({
        email: companyEmail,
        link: "https://cinab-seller.vercel.app/",
        companyName: companyName,
      });

      console.log("Sent email to", companyEmail, companyName);
      return res.status(201).json(createdVendor);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  updateVendor: async (req, res) => {
    const {
      companyName,
      Kra,
      licence,
      AddressOne,
      AddressTwo,
      city,
      state,
      website,
      services,
      BankName,
      AccountNumber,
      MpesaNumber,
      MpesaName,
      SAddressOne,
      SAddressTwo,
      Scity,
      Sstate,
      password,
      country,
      Postal_Address,
      businessType,
      shopName,
      shopZone,
      username,
      secretCode,
    } = req.body;
    console.log(req.body);
    const imageFile = req.file;
    try {
      const vendor = await Vendor.findOne({ where: { secretCode } });
      const imagePath = `${API}/uploads/${imageFile.filename}`;
      if (!vendor) {
        return res.status(404).send({ error: "Vendor Not Found" });
      } else {
        // Create an object A with only the authData (password and email)

        // find the id of the last user
        const lastUser = await User.findOne({
          order: [["id", "DESC"]],
        });

        // hashpassword
        const hashedPassword = await bcrypt.hash(password, 10);

        const userDataInfo = {
          name: username,
          email: vendor.companyEMail,
          role: "Vendor",
          refreshToken: null,
          password: hashedPassword,
          id: lastUser ? lastUser.id + 1 : 1,
        };
        await newUser(userDataInfo, password);

        // Create a separate object called vendorData with all fields except password and email
        const vendorData = {
          secretCode: null,
          companyName,
          Kra,
          licence,
          AddressOne,
          userId: lastUser ? lastUser.id + 1 : 1,
          AddressTwo,
          city,
          state,
          website,
          services,
          BankName,
          AccountNumber,
          MpesaNumber,
          MpesaName,
          SAddressOne,
          SAddressTwo,
          Scity,
          Sstate,
          country,
          Postal_Address,
          businessType,
          shopName,
          shopZone,
          username,
          image: imagePath,
        };

        const updatedVendor = await vendor.update(vendorData);

        return res.status(200).json({ updatedVendor });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  deleteVendor: async (req, res) => {
    const { id } = req.params;
    try {
      const vendor = await Vendor.findByPk(id);
      if (!vendor) {
        return res.status(404).send({ error: "Vendor Not Found" });
      } else {
        await Vendor.destroy({ where: { id } });
        return res.status(204).send(); // Successful deletion, no content to return
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },
};

module.exports = vendorController;
