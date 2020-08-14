const Sequelize = require("sequelize");
const { removeAllListeners } = require("../app");
const Op = Sequelize.Op;

const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    //since we are searching, editing, deleting by slug, these need to be unique
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
  tags: {
    type: Sequelize.STRING,
  },
});

Page.beforeValidate((page) => {
  /*
   * Generate slug
   */
  if (!page.slug) {
    page.slug = page.title.replace(/\s/g, "_").replace(/\W/g, "").toLowerCase();
  }

  if (typeof page.tags === "string") {
    page.tags = page.tags.split(",").map((str) => str.trim());
  }
});

Page.findByTag = function (tag) {
  return this.findAll({
    where: {
      tags: { [Op.contains]: [tag] },
    },
  });
};

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false,
  },
});

//This adds methods to 'Page', such as '.setAuthor'. It also creates a foreign key attribute on the Page table pointing ot the User table
Page.belongsTo(User, { as: "author" });

module.exports = {
  db,
  Page,
  User,
};
