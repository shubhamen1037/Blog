module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
      'user',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        mobile_number: { type: DataTypes.BIGINT, allowNull: false },
        email: { type: DataTypes.STRING, allowNull:false },
        password: { type: DataTypes.STRING, allowNull:false },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      },
      {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
      },
    );

    // user.associate = (models)=> {
    //   user.hasMany(models.post, {
    //     foreignKey : 'user_id'
    //   });
    // };


    return user;
};