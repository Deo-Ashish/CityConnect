require("dotenv").config();

const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");

async function startServer() {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1); // stop app if DB fails
  }
}

startServer();
