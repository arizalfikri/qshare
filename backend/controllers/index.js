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
        id_user: findUser.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, name } = req.body;

      if (!name) {
        throw { name: "Name is required" };
      }

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
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
      const { name, price, quantity } = req.body;

      if (!name) throw { name: "Name is required" };
      if (!price) throw { name: "Price is required" };
      if (!quantity) throw { name: "Quantity is required" };

      const duplicateProduct = await Product.findOne({
        where: {
          name,
        },
      });
      if (duplicateProduct) throw { name: "Name product can't be the same" };

      const newProduct = await Product.create({
        name,
        price,
        quantity,
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
      const { productId, quantity } = req.body;
      console.log(productId);
      const userId = req.user.id;

      const findOrder = await Order.findOne({
        where: {
          UserId: userId,
          ProductId: productId,
        },
      });
      const exitingProduct = await Product.findOne({
        where: {
          id: productId,
        },
      });

      if (exitingProduct.quantity === 0) throw { name: "product run out" };
      if (exitingProduct.quantity < quantity) throw { name: "too many orders" };

      await Product.update(
        {
          quantity: exitingProduct.quantity - quantity,
        },
        {
          where: {
            id: productId,
          },
        }
      );

      if (!findOrder || findOrder === null) {
        const newOrder = await Order.create({
          ProductId: productId,
          UserId: userId,
          price_total: quantity * Number(exitingProduct.price),
          quantity,
        });

        const result = {
          ...newOrder,
        };
        res.status(201).json(result);
      } else {
        const newOrder = await Order.update(
          {
            price_total:
              findOrder.price_total + quantity * Number(exitingProduct.price),
            quantity: findOrder.quantity + quantity,
          },
          {
            where: {
              UserId: userId,
              ProductId: productId,
            },
          }
        );

        const result = {
          ...newOrder,
        };
        res.status(201).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  static async readOrder(req, res, next) {
    try {
      // const use
      const userId = req.user.id;
      const Orders = await User.findOne({
        where: {
          id: userId,
        },
        include: [Product],
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
