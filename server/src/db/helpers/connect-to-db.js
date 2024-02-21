import { connect } from "mongoose";

import { DB_URL, MONGOOSE_DEBUG, isProd } from "../../config/__index.js";

export const connectToDb = () => {
  if (MONGOOSE_DEBUG) {
    console.log(`connecting to database...`);
  }

  connect(DB_URL).then(
    (db) => {
      if (!isProd && MONGOOSE_DEBUG) {
        db.set("debug", true);
        console.log("DB_URL", DB_URL);
        console.log("------------------------------------");
      }
      console.log("succesfully connected to database");

      return db;
    },
    (err) => {
      throw new Error("db failed to connect", { cause: err });
    }
  );
};

export default {
  connectToDb,
};
