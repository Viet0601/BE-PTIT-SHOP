import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import e from "express";
const salt = bcrypt.genSaltSync(12);
const createNewToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};
const checkpassword = (password) => {
  let strength = 0;
  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 1;
  }

  if (password.length < 6) {
    return {
      EC: -1,
      EM: "Mật khẩu tối thiểu 6 kí tự",
    };
  }
  if (strength < 4) {
    return {
      EC: -1,
      EM: "Mật khẩu phải gồm 1 kí tự in hoa,1 kí tự in thường, 1 chữ số, 1 kí tự đặc biệt",
    };
  }
  return {
    EC: 0,
    EM: "Mật khẩu mạnh",
  };
};
export const RegisterUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existUser = await userModel.findOne({ email: data.email });

      if (existUser) {
        resolve({
          EC: -1,
          EM: "Email này đã được sử dụng!",
        });
      } else {
        if (!validator.isEmail(data.email)) {
          resolve({
            EC: -1,
            EM: "Email không hợp lệ!",
          });
        }
        const checkPassword = checkpassword(data.password);
        if (checkPassword.EC === 0) {
          console.log("ok");
          const hashPassword = bcrypt.hashSync(data.password, salt);
          const newuser = new userModel({
            email: data.email,
            password: hashPassword,
            name: data.name,
          });
          console.log(hashPassword);
          const user = await newuser.save();
          const access_token = createNewToken(user._id);
          resolve({
            EC: 0,
            EM: "Đăng kí tài khoản thành công",
            access_token: access_token,
          });
        } else {
          resolve(checkPassword);
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const LoginService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (validator.isEmail(data.email)) {
        const user = await userModel.findOne({ email: data.email });
        if (user) {
          const isCheckPassWord = bcrypt.compareSync(
            data.password,
            user.password
          );
          if (isCheckPassWord) {
            const access_token = createNewToken(user._id);
            resolve({
              EC: 0,
              EM: "Đăng nhập thành công!",
              DT: {
                user: user,
                access_token: access_token,
              },
            });
          } else {
            resolve({
              EC: -1,
              EM: "Sai mật khẩu!",
            });
          }
        } else {
          resolve({
            EC: -1,
            EM: "Email này chưa được đăng kí tài khoản",
          });
        }
      } else {
        resolve({
          EC: -1,
          EM: "Email không hợp lệ!",
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
