import {Sequelize} from 'sequelize'

import {$db} from '../../config'

const {dialect, port, host, database, username, password} = $db

const uri = `${dialect}://${username}:${password}@${host}:${port}/${database}`
const sequelize = new Sequelize(uri)

const models = {
   User: require('./User ').default(sequelize, Sequelize),
   Session: require('./Session').default(sequelize, Sequelize),
   sequelize,
   uri,
}

export default models
