const router = require("express").Router()

const servicesRouter = require("./schedule")
const professionalRouter = require("./professional")
const patientRouter = require("./patient")
const logout = require("./logout")

router.use("/", servicesRouter,professionalRouter, patientRouter, logout)

module.exports = router;