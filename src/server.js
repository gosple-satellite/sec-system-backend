require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SEC Backend Running");
});

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
// const estateRoutes = require("./modules/estates/estate.routes");
// const programRoutes = require("./modules/programs/program.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const vehicleRoutes = require("./modules/vehicles/vehicle.routes");
const visitorPassRoutes = require("./modules/visitor-passes/visitorPass.routes");
const smartCardRoutes = require("./modules/smart-cards/smartCard.routes");
const accessHistoryRoutes = require("./modules/access-history/accessHistory.routes");
const residentDashboardRoutes = require("./modules/resident-dashboard/dashboard.routes");
const anprRoutes = require("./modules/anpr/anpr.routes");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/estates", estateRoutes);
// app.use("/api/v1/programs", programRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/visitor-passes", visitorPassRoutes);
app.use("/api/v1/smart-cards", smartCardRoutes);
app.use("/api/v1/access-history", accessHistoryRoutes);
app.use("/api/v1/resident", residentDashboardRoutes);
app.use("/api/v1/anpr", anprRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });