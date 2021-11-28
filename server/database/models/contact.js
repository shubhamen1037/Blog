module.exports = (sequelize, DataTypes) => {
    const contact = sequelize.define(
      'contact',
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
        message: { type: DataTypes.TEXT, allowNull:false },
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      },
      {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
      },
    );


    return contact;
};