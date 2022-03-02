import {Strategy as LocalStrategy} from 'passport-local'
import validPwd from '../lib/validPwd'
import models from '../models'

const verifyCallback = (
   username: string,
   password: string,
   done: any,
): void => {
   models.User.findOne({where: {username: username}})
      .then((user: any) => {
         if (!user) {
            return done(null, false)
         }

         const isValid = validPwd(password, user.hash, user.salt)

         if (isValid) {
            return done(null, user)
         } else {
            return done(null, false)
         }
      })
      .catch((err: any) => {
         done(err)
      })
}

const localStrategy = new LocalStrategy(verifyCallback)

export default localStrategy
