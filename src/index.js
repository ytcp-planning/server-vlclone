const express = require('express');
const morgan = require('morgan');
const hpp = require('hpp');
const cors = require('cors');
const helmet = require('helmet');
const  { config } = require('dotenv'); 
const  { db } = require('./config/config');

const AuthRoutes = require('./routes/auth')
const MemberRouters = require('./routes/member')
const ProductCategory = require('./routes/product_category'); 
const Product = require('./routes/product');
const app = express();
config();

app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.send("Test Server");
});
require("./models");

app.use("/", AuthRoutes);
app.use("/", MemberRouters);
app.use("/",  ProductCategory);
app.use("/",  Product);
// app.use("/", CourseRoutes);
// app.use("/", LecturerRoutes);

app.listen(process.env.APP_PORT, async () => {
  await db.sync();
  console.log(`=================================`);
  console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
  console.log(`🚀 App listening on the port ${process.env.APP_PORT}`);
  console.log(`=================================`);
  console.log(
    `Hi, I am running at http://${process.env.APP_HOST}:${process.env.APP_PORT}/`
  );
});
