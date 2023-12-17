const mongoose = require("mongoose");

const app = require("./app");

const { DB_URI, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log("Server running. Use our API on port: ", PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
