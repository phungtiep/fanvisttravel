import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoute from "./routes/booking.js";
import getRoutes from "./routes/getRoutes.js";
import getCars from "./routes/getCars.js";
import getPrice from "./routes/getPrice.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/booking", bookingRoute);
app.get("/api/routes", getRoutes);
app.get("/api/cars", getCars);
app.get("/api/price", getPrice);
// START SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("🚀 Backend is running on port " + PORT);
});
