const log4js = require("log4js")

log4js.configure({
  appenders: {
    consola: { type: "console" },
    archivoWarn: { type: "file", filename: "warnings.log" },
    archivoError: { type: "file", filename: "error.log" },

    soloWarn: {
      type: "logLevelFilter",
      appender: "archivoWarn",
      level: "warn",
    }
    ,
    soloError: {
      type: "logLevelFilter",
      appender: "archivoError",
      level: "error",
    },
  },
  categories: {
    default: { appenders: ["consola"], level: "info" },
    desarrollo: { appenders: ["consola"], level: "warn" },
    produccion: { appenders: ["soloWarn", "soloError"], level: "error" },
  },
})

const logAUtilizar =  process.env.NODE_ENV === "PROD" ? "produccion" : "desarrollo"

const logger = log4js.getLogger(logAUtilizar)
module.exports = logger