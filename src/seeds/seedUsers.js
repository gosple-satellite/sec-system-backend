// src/seeds/seedUsers.js
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../modules/auth/auth.model");
async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({});

    const users = [
      {
        firstName: "System",
        lastName: "Administrator",
        email: "admin@sec.local",
        phone: "08010000001",
        password: "Password123!",
        role: "SUPER_ADMIN",
      },
      {
        firstName: "John",
        lastName: "Resident",
        email: "resident@sec.local",
        phone: "08010000002",
        password: "Password123!",
        role: "RESIDENT",
      },
      {
        firstName: "David",
        lastName: "Gate",
        email: "gate@sec.local",
        phone: "08010000003",
        password: "Password123!",
        role: "GATE_OFFICER",
      },
      {
        firstName: "Grace",
        lastName: "Estate",
        email: "estate@sec.local",
        phone: "08010000004",
        password: "Password123!",
        role: "ESTATE_OFFICER",
      },
      {
        firstName: "Michael",
        lastName: "Command",
        email: "command@sec.local",
        phone: "08010000005",
        password: "Password123!",
        role: "COMMAND_CENTER",
      },
    ];

    for (const user of users) {
	  await User.create(user);
	}

    console.log("Users seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seedUsers();