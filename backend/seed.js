/* seed.js */
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Simulation = require("./models/Simulation");
const Group = require("./models/Group");

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    // 1. Create Simulation
    const simulation = await Simulation.create({
      name: "Demo Simulation",
      totalRounds: 10,
      rounds: Array.from({ length: 10 }, (_, i) => ({ roundNumber: i + 1, name: `Round ${i + 1}` }))
    });
    console.log("Step 1: Simulation Created ->", simulation._id);

    // 2. Create Group linked to Simulation
    const group = await Group.create({
      name: "Demo Group",
      simulationId: simulation._id
    });
    console.log("Step 2: Group Created ->", group._id);

    // 3. Create User linked to Simulation & Group
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await User.create({
      username: "admin",
      password: hashedPassword,
      simulationId: simulation._id.toString(),
      groupId: group._id.toString() 
    });

    console.log("Step 3: User Created!");
    console.log("=================================");
    console.log("✅ LOGIN CREDENTIALS:");
    console.log(`Username: ${user.username}`);
    console.log(`Password: password123`);
    console.log("=================================");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

runSeed();