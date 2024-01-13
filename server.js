require("dotenv").config();
var cors = require("cors");
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router");
const contactRouter = require("./controllers/contact-controller");
const ConnectionDB = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
const Service = require("./router/service-router");
const AdminRoutes = require("./router/admin-router");
const path = require("path");
app.use(cors());
var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", Service);
app.use("/api/admin", AdminRoutes);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use(errorMiddleware);
ConnectionDB().then(() => {
  const PORT = process.env.PORT ?? 8000;
  app.listen(PORT, () => {
    console.log(`Your Server is started on port ${PORT}`);
  });
});
