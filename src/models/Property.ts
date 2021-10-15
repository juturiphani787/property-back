import * as mongoose from 'mongoose';
export interface IProperty extends mongoose.Document {
  status: Number;
};

const PropertySchema = new mongoose.Schema({

  propertyDetails: Object,
  thumbImages: Array,
  propertyImages:Array,
  videos:Array,
  images350:Array,
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

export const Property = mongoose.model<IProperty>('Property', PropertySchema);
