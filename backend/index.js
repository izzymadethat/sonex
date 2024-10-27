const app = require("./app");
const { port, mongodb } = require("./config");
const mongoose = require("mongoose");

// Start server after database connection
mongoose
  .connect(mongodb.dbURI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is now running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
