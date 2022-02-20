import {IDataTypes, ISessions} from 'types'

export default (sequelize: any, DataTypes: IDataTypes): ISessions => {
   return sequelize.define(
      'Session',
      {
         sid: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.STRING,
         },
         expire: {
            type: DataTypes.DATE,
            allowNull: true,
         },
         sess: {
            type: DataTypes.JSON,
            allowNull: false,
         },
      },
      {timestamps: false},
   )
}
