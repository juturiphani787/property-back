import * as mongoose from 'mongoose';
export interface IRoom extends mongoose.Document {
  status: Number;
};

const RoomSchema = new mongoose.Schema({

  roomDetails: Object,
  thumbImages: Array,
  RoomImages:Array,
  videos:Array,
  images350:Array,
  propertyId:{
    type:String
  },
  userId: {
    type:String,
    required:true
  },
  createdOn: {
    type: Date,
    default: new Date()
  },
  updatedOn: {
    type: Date,
    default: new Date()
  }

});

export const Room = mongoose.model<IRoom>('Room', RoomSchema);
