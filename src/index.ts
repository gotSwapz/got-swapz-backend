import dotenv from "dotenv";
import { app } from "./app";
import { sequelize } from "./database/sequelize.db";

dotenv.config();

const port = process.env.PORT;
const dropTables = process.env.DROP_TABLES === "true";

(async () => {
  await sequelize.sync({ force: dropTables });
  app.listen(port, () =>
    console.log(
      ` ⚡️ Litening on port ${port}\n`,
      `📡 Active network: ${process.env.NETWORK}\n`
    )
  );
})();
