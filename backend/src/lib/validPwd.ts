import crypto from 'crypto'

const validPwd = (
   password: string,
   hash: string,
   salt: string,
): boolean => {
   const genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex')

   return hash == genHash
}

export default validPwd
