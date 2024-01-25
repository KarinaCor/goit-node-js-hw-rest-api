const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config();

const contactsRouter = require('./routes/api/contacts')

const authRouter = require('./routes/api/auth')

const authMiddleware = require("./middlewares/authenticate")



const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', authMiddleware, contactsRouter)
app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
   const { status = 500, message = "Server error" } = err;
   res.status(status).json({ message });

})

module.exports = app
