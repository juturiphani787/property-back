import crypto from "crypto";
import _, { property } from "lodash";
import { JwtUtil } from "../utils/JwtUtil";
import { AppConstants } from "../config/AppConstants";
import { IUser, User } from "../models/User";
import { IBookings, Bookings } from "../models/Bookings";
const request = require('request')
import fetch from "node-fetch";
import { IProperty, Property } from "../models/Property";
import { IRoom, Room } from "../models/Room";
import { ObjectId } from "mongodb";

export class UserService {
  userBookings(request: any) {
    throw new Error("Method not implemented.");
  }
  jwtUtil: JwtUtil = new JwtUtil();
  constructor() { }

  async createUser(_userData: any, reqUser?: any) {
    try {
      let user = await User.findOne({ userId: _userData.userId });
      if (_.isEmpty(user)) {
        let newUser: IUser = new User(_userData);
        newUser.userId = _userData.userId.toLowerCase()
        newUser.password = crypto
          .createHash("md5")
          .update(_userData.password)
          .digest("hex")
        newUser.updatedOn = new Date();
        newUser.createdOn = new Date();
        newUser.createdBy = reqUser._id;
        newUser.updatedBy = reqUser._id;
        //newUser.status = 1;
        let result = await newUser.save();
        return result;
      } else {
        throw new Error('User with given user id already exist');
      }
    }
    catch (err) {
      throw err;
    }
  }

  async userLogin(_loginData: any) {
    try {

      const user: any = await User.findOne({
        userId: _loginData.userId, password: crypto
          .createHash("md5")
          .update(_loginData.password)
          .digest("hex")
      });
      console.log('user1', user);
      if (!_.isEmpty(user) && user.status == AppConstants.USER_STATUS.ACTIVE) {

        console.log('user2', user);

        let payload: any = {
          userType: user.userType,
          _id: user._id
        };

        let token = this.jwtUtil.generateAuthToken(payload);

        let userUpdate = await User.findOneAndUpdate({ _id: user._id }, {
          $set: {
            loggedInStatus: true,
            latitude: _loginData.latitude,
            longitude: _loginData.longitude,
            ipAddress: _loginData.ipAddress,
            token: token,
            updatedOn: new Date()
          }
        });

        let userInfo: any = {
          id: user._id,
          userType: user.userType
        };

        return {
          token: token,
          userType: user.userType,
          id: user._id,
          user: user,
        }
      } else if (user && user.status != AppConstants.USER_STATUS.ACTIVE) {
        throw new Error("Account is not active.Please contact help desk.");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      throw err;
    }
  }

  async userLoggedOut(_userData: any) {
    try {

      console.log(_userData);

      //let user = await User.findOne({ _id: new ObjectId(_userData.userId) });
      let userUpdate = await User.updateOne({ _id: _userData.userId }, {
        $set: {
          loggedInStatus: false,
          readyState: "",
          updatedOn: new Date()
        }
      });
      return userUpdate;
    } catch (err) {
      throw err;
    }
  }

  async listAllRegisterUsers(data: any) {
    try {

      return await User.find({ registerUserType: data.registerUserType });

    } catch (error) {
      throw error;
    }
  }

  async listUserBookings(data: any) {
    try {

      return await Bookings.find({ userId: data.userId });

    } catch (error) {
      throw error;
    }
  }


  async listBookings(data: any) {
    try {
      let bookings: any = [];

      let query = {};
      if(data.bookingId) {
        query = {
          _id:data.bookingId
        }
      }

      await Bookings.find(query).then(async (resp: any) => {
        if(resp.length > 0) {
          for (let booking of resp) {
            await Property.findOne({ _id: new ObjectId(booking.propertyId) }).then(async (property: any) => {
              await Room.findOne({ _id: booking.roomId }).then(async (room: any) => {
                await User.findOne({ _id: booking.userId }).then((user: any) => {
                  bookings.push({
                    bookingData:booking,
                    room:room,
                    property:property,
                    user:user
                  });
                })
              })
            });
          }
        }
      });
      return bookings;

    } catch (error) {
      throw error;
    }
  }



}
