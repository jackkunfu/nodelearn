const Sequelize = require('sequelize')
function initModel (seque) {
  const User =  seque.define("user", { name: { type: Sequelize.STRING(20), allowNull: false } });
  const Product = seque.define('product', { title: { type: Sequelize.STRING, allowNull: false } });
  Product.belongsTo(User);
  User.hasMany(Product);
  return { User, Product }
}

(async () => {
  const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    logging: false
  })
  const { Product, User } = await initModel(sequelize)
  use = await User.create({ name: 'Tom' })
  await use.createProduct({ title: '商品一' })
  await use.createProduct({ title: '商品二' })
  console.log(JSON.parse(JSON.stringify(await Product.findAll({ attributes: 'title' }))))
})()