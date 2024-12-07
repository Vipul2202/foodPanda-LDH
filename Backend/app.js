
const express = require("express");
const app = express();
const port = 8080;
const db = require("./config/db");

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(__dirname + "/public"));
const adminroutes = require("./routes/admin.routes");
const generalRoutes = require("./routes/general.routes");
app.use("/admin", adminroutes);

app.use("/general", generalRoutes);

app.get("/", (req, res) => {
  res.status(200).json({msg: "Servers are active and running  !"})
})


const seeder = require("./config/seeder");
seeder.adminseeder();

app.listen(port, () => console.log(`Server is running on ${port}`));
