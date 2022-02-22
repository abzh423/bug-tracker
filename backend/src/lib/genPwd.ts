import crypto from 'crypto'
import {HashSalt} from 'types'

const genPwd = (password: string): HashSalt => {
   const salt = crypto.randomBytes(32).toString('hex')
   const genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex')
   return {
      salt: salt,
      hash: genHash,
   }
}

export default genPwd
