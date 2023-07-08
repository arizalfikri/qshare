"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   Order.belongsTo(models.Product, { foreignKey: "productId" });
      //   Order.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Order.init(
    {
      UserId: DataTypes.NUMBER,
      ProductId: DataTypes.NUMBER,
      total: DataTypes.NUMBER,
      total_price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
