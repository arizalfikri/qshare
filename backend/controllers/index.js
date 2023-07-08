"use strict";
const { verifiedPass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");

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
}

module.exports = {
  Controller,
};
