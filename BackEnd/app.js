const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const db = require('./utilities/connect')
const router = require('./routes/router')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config()


const requestLogger = require('./utilities/requestLogger')
const errorLogger = require('./utilities/errorLogger')

app.use(helmet());
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:4200','http://localhost:8080'],
    credentials:true
}));

app.use(requestLogger);

app.use('/', (req, res, next) => {
    db.connectDb().then((data) => {
        next()
    }).catch((err) => {
        next(err)
    })
})
console.log("executes");
//call routes
app.use('/',router)


app.use(errorLogger);
app.listen(3000, () => console.log(`Server running on port ${process.env.PORT}`))