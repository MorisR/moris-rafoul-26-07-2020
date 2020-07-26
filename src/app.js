//express dependencies
const express = require("express")
const favicon = require('serve-favicon');
const helmet = require("helmet")
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(helmet())
app.disable('x-powered-by');









export default app;