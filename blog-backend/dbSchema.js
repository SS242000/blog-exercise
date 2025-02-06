const sequelize = require("./db");
const {DataTypes} = require("sequelize");

const User = sequelize.define('User', {
    id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING(19),
      allowNull: false
    }
  }, {
    tableName: 'users' ,
    timestamps: false // Exclude Sequelize's default timestamps

  });
const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.TINYINT
    },
    title: {
      type: DataTypes.STRING(44)
    },
    content: {
      type: DataTypes.STRING(92)
    },
    published_at: {
      type: DataTypes.STRING(19)
    },
    updated_at: {
      type: DataTypes.STRING(19)
    }
  }, {
    tableName: 'blogs',
    timestamps: false // Exclude Sequelize's default timestamps

  });
const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.TINYINT
    },
    blog_id: {
      type: DataTypes.TINYINT
    },
    content: {
      type: DataTypes.STRING(58)
    },
    created_at:{
      type:DataTypes.TIME
    }
  }, {
    tableName: 'comments',
    timestamps: false // Exclude Sequelize's default timestamps

  });
  const BlogView = sequelize.define('BlogView', {
    id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true
    },
    blog_id: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.TINYINT,
        allowNull: true // Allow null for anonymous users
    },
    viewed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'blog_views',
    timestamps: false
});

  module.exports = {User,Blog,Comment,BlogView}