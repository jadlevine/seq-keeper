const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const GeneRouter = require('./routes/GeneRouter')
const SequenceRouter = require('./routes/SequenceRouter')
const UserRouter = require('./routes/UserRouter')

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ message: 'Server Works' }))

app.use('/user/genes', GeneRouter)
app.use('/user/sequences', SequenceRouter)
app.use('/users', UserRouter)

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
