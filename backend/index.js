require("dotenv").config();

const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5000", 10);
const db = require("./src/db");

const initApp = async () => {
  // eslint-disable-next-line no-restricted-syntax
  console.log("Testing the database connection..");
  /*
   * Test the connection.
   * You can use the .authenticate() function to test if the connection works.
   */
  try {
    await db.authenticate();
    // eslint-disable-next-line no-restricted-syntax
    console.log("Connection has been established successfully.");
    await db.sync();

    /*
     * Start the web server on the specified port.
     */

    app.listen(port, (err) => {
      if (err) {
        console.error("Something bad happened");
      } else {
        // eslint-disable-next-line no-restricted-syntax
        console.log(`Server is listening on ${port}`);
      }
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

/**
 * Initialize the application.
 */
initApp();
