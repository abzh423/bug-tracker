const checkAuth = (req: any, res: any, next: any): void => {
   if (req.isAuthenticated()) {
      next()
   } else {
      res.status(401).send('You are not authenticated ')
   }
}

const checkAuthAdmin = (req: any, res: any, next: any): void => {
   if (req.isAuthenticated() && req.user.admin) {
      next()
   } else {
      res.status(401).send(
         'You are not authenticated or dont have admin perms',
      )
   }
}

export {checkAuth, checkAuthAdmin}
