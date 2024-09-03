const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const apiRoutes = require("./routes/index");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", apiRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
  connectDB(); // Connect to MongoDB
});
