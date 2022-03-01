export interface IUser {
   id: string
   username: string
   hash: string
   salt: string
   email: string
   admin: boolean
   active: boolean
}

export interface IDataTypes {
   STRING: string
   BOOLEAN: boolean
   TEXT: string
   INTEGER: number
   DATE: string
   FLOAT: number
   JSON: object
}

export interface IBug {
   id: string
   title: string
   description: string
   reporter: string
   status: string
   assignee: string
   severity: string
   doBefore: Date
}

export interface ISessions {
   sid: string
   expire: string
   sess: any
}

export interface HashSalt {
   salt: string
   hash: string
}
