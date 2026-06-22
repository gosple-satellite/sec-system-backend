// src/utils/accessLogger.js
const AccessHistory = require("../modules/access-history/accessHistory.model");
const logAccess = async ({resident, type, method, subject, gate = "Main Gate"}) => {
  try {
    await AccessHistory.create({
      resident,
      type,
      method,
      subject,
      gate,
    });
  } catch (error) {
    console.error(
      "Access Logger Error:",
      error.message
    );
  }
};

module.exports = logAccess;