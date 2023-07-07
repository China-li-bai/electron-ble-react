const { version } = require("./version")
const {exposeBleApi}  = require("./bluetooth")
version()
exposeBleApi()