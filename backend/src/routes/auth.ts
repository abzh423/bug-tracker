import express from 'express'
import passport from 'passport'
import {v4 as uuidv4} from 'uuid'
import genPwd from '../lib/genPwd'
import models from '../models'
import {checkAuth, checkAuthAdmin} from './checkAuth'

// eslint-disable-next-line new-cap
const router = express.Router()

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
      .then(() => {
         res.redirect('/success')
      })
      .catch((err: any) => {
         res.redirect('/login')
      })
})

router.post(
   '/login',
   passport.authenticate('local', {
      failureRedirect: '/login-failure',
      successRedirect: '/login-success',
   }),
)

router.get('/protected-route', checkAuth, (req, res, next) => {
   res.send(`You made it to the route.`)
})

router.get('/admin-route', checkAuthAdmin, (req, res, next) => {
   res.send(`You made it to the admin route.`)
})

router.get('/logout', (req, res, next) => {
   req.session.destroy((err) => {
      if (err) return next(err)

      req.logout()
   })

   res.redirect('/login')
})

export default router
