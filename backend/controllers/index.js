"use strict";
const { verifiedPass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Product, Order } = require("../models/index");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser || !verifiedPass(password, findUser.password)) {
        throw { name: "Invalid email/password" };
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
      };

      const token = createToken(payload);

      res.status(200).json({
        access_token: token,
        name: findUser.name,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, name } = req.body;

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      if (!name) {
        throw { name: "Name is required" };
      }

      const newUser = await User.create({
        email,
        password,
        name,
      });

      const result = {
        id: newUser.id,
        name: newUser.name,
      };
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const { name, total, price } = req.body;

      if (!name) throw { name: "Name is required" };
      if (!total) throw { name: "total is required" };
      if (!price) throw { name: "price is required" };

      const duplicateProduct = await Product.findOne({
        where: {
          name,
        },
      });
      if (duplicateProduct) throw { name: "Name product can't be the same" };

      const newProduct = await Product.create({
        name,
        total,
        price,
      });

      const result = {
        id: newProduct.id,
        name: newProduct.name,
      };
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async allProduct(req, res, next) {
    try {
      const allProduct = await Product.findAll();

      res.status(200).json(allProduct);
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req, res, next) {
    try {
      const { total, productId } = req.body;
      const userId = req.user.id;

      const existingProduct = await Product.findOne({
        where: {
          id: productId,
        },
      });

      if (existingProduct.total < total) throw { name: "Order too much" };
      const updateProduct = await Product.update(
        { total: existingProduct.total - total },
        {
          where: {
            id: productId,
          },
        }
      );

      if (updateProduct[0] === 1) {
        const newOrder = await Order.create({
          ProductId: productId,
          UserId: userId,
          total: total,
          total_price: total * Number(existingProduct.price),
        });

        const result = {
          ...newOrder,
        };
        res.status(201).json(result);
      } else {
        throw { name: "Error update product" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async readOrder(req, res, next) {
    try {
      // const use
      const userId = req.user.id;
      const Orders = await Order.findAll({
        where: {
          UserId: userId,
        },
      });

      res.status(200).json(Orders);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
