import { string } from 'joi';
import * as mongoose from 'mongoose';
export interface IUser extends mongoose.Document {
    _id: String;
    firstName?: String,
    lastName?: String,
    userId?: String,
    email?: String,
    phone?: Number,
    token?: String,
    password?: String,
    userType?: String,
    readyState?:String,
    department?: String,
    stationId?: String,
    dol?: Date,
    doj?: Date,
    team?: String,
    skills?: Array<String>,
    agents?: Array<any>,
    superAgents?: Array<any>,
    superVisors?: Array<any>,
    loggedaInStatus?: Boolean,
    status?: Number,
    createdOn?: Date,
    updatedOn?: Date,
    createdBy?: any,
    updatedBy?: any,
    registerUserType: any,
    address: any,
    pincode:any
};

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        index: true,
        required: true
    },
    lastName: {
        type: String,
        index: true,
        //required: true
    },
    password: { type: String, required: false },
    userId: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    token: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    readyState:{
        type:String
    },
    address: {
        type: String
    },
    pincode: {
        type: String
    },
    userType: {
        type: String,
       // enum: ['admin', 'agent', 'superagent', 'supervisor']
    },
    department: {
        type:String
    },
    stationId: {
        type: String,
        required: false
    },
    dol: Date,
    doj: Date,
    photo: String,
    team: {
        type: String,
        required: false
    },
    skills: [{ type: String }],

    agents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    superAgents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    superVisors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    status: {
        type: String,
        default: 'active'
    },
    loggedInStatus:{
        type: Boolean,
    },
    assignPartners: {
        type:Boolean,
        default:false
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    ipAddress:{
        type:String
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    updatedOn: {
        type: Date,
        default: new Date()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null
    },
    registerUserType: {
        type: String,
    },

});

export const User = mongoose.model<IUser>('User', UserSchema);
