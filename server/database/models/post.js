module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define(
      'post',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
        user_id:{ type: DataTypes.INTEGER, unique: false, allowNull: false  },
        title: { type: DataTypes.STRING, allowNull: true },
        content: { type: DataTypes.TEXT, allowNull: true },
        image_url: { type: DataTypes.STRING, allowNull: false },            
        created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      },
      {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
      },
    );

    post.associate = (models)=> {
      post.belongsTo(models.user, {
        foreignKey: 'user_id',
        // as: 'user'
      });
    };

    return post;
};