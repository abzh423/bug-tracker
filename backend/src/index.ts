import express from 'express'
import session from 'express-session'
import pgStore from 'connect-pg-simple'
import passport from 'passport'
import models from './models'
import {$port, $sessionSecret} from '../config'
import localStrategy from './strategies/passportLocal'
import auth from './routes/auth'

const app = express()
const PgStore = pgStore(session)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// express-sessions
app.use(
   session({
      secret: $sessionSecret,
      resave: false,
      saveUninitialized: true,
      store: new PgStore({
         conString: models.uri,
         tableName: 'Sessions',
      }),
      cookie: {
         maxAge: 1000 * 60 * 60 * 24 * 7,
      },
   }),
)

// passport
passport.use(localStrategy)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user: any, done): void => {
   done(null, user.id)
})

passport.deserializeUser((userId, done) => {
   models.User.findOne({where: {id: userId}})
      .then((user: any) => {
         done(null, user)
      })
      .catch((err: any) => done(err))
})

// routes
app.use(auth)

// database sync and server start
const alter = true
const force = false
models.sequelize.sync({alter, force}).then(() => {
   console.log('Database has been successfuly synced')
   app.listen($port, () => {
      console.log(`Server is listening to port ${$port}`)
   })
})
