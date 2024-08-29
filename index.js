require("dotenv").config();
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const connectDB = require("./config/db");
const session = require("express-session");
const compression = require("compression");
const apiRoutes = require("./routes/index");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

// create express app
const app = express();

// middlewares
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
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", apiRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listining on port: ${process.env.PORT}`);
  connectDB();
});
