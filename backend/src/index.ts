import express from 'express'
import models from './models'
import session from 'express-session'
import {$port, $sessionSecret} from '../config'

const app = express()
const PgSessionConnect = require('connect-pg-simple')(session)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
   session({
      secret: $sessionSecret,
      resave: false,
      saveUninitialized: true,
      store: new PgSessionConnect({
         conString: models.uri,
         tableName: 'Sessions',
      }),
      cookie: {
         maxAge: 1000 * 60 * 60 * 24 * 7,
      },
   }),
)

declare module 'express-session' {
   export interface SessionData {
      viewCount: number
   }
}

app.get('/', (req, res) => {
   if (req.session.viewCount) {
      req.session.viewCount += 1
   } else {
      req.session.viewCount = 1
   }

   res.send(`Hello Mom ${req.session.viewCount}`)
})

const alter = true
const force = false

models.sequelize.sync({alter, force}).then(() => {
   console.log('Database has been successfuly synced')
   app.listen($port, () => {
      console.log(`Server is listening to port ${$port}`)
   })
})
