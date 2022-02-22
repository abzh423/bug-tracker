import express from 'express'
import passport from 'passport'
import {v4 as uuidv4} from 'uuid'
import genPwd from '../lib/genPwd'
import models from '../models'

// eslint-disable-next-line new-cap
const router = express.Router()

router.post('/login', passport.authenticate('local'), (req, res, next) => {})

router.post('/register', (req, res, next) => {
   const pwd = genPwd(req.body.password)

   const salt = pwd.salt
   const hash = pwd.hash

   models.User.create({
      id: uuidv4(),
      username: req.body.username,
      email: req.body.email,
      hash: hash,
      salt: salt,
   })

   res.redirect('/login')
})

router.get('/register', (req, res, next) => {
   res.send(`
   <h1>Register Page</h1><form method="post" action="register">\
   Enter Username:<br><input type="text" name="username">\
   <br>Enter Password:<br><input type="password" name="password">\
   <br>Enter Email:<br><input type="text" name="email">\
   <br><br><input type="submit" value="Submit"></form>
   `)
})

export default router
