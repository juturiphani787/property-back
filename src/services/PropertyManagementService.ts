import { IProperty, Property } from "../models/Property";
import { IRoom, Room } from "../models/Room";

export class PropertyManagementService {
  

  constructor() { }

  async listAllProperties(data:any) {
    try {

      return await Property.find();

    } catch (error) {
      throw error;
    }
  }

  async listPropertyRooms(data:any) {
    try {

      return await Room.find({propertyId:data.propertyId});

    } catch (error) {
      throw error;
    }
  }

  async addProperty(data: any, reqUser?: any) {
    try {
      let property;
      await Property.findOne({ _id: data.propertyId }).then(async (resp) => {
        if (resp == null) {
          let newProperty: IProperty = new Property(data);
          let saveProperty = await newProperty.save();
          property = saveProperty;

        } else {
          property = await Property.updateOne({ _id: data._id }, { $set: data });
        }
      })

      return property;
    }
    catch (err) {
      throw err;
    }
  }

  async addRoom(data: any, reqUser?: any) {
    try {
      let room;
      await Room.findOne({ _id: data.roomId }).then(async (resp) => {
        if (resp == null) {
          let newRoom: IRoom = new Room(data);
          let saveRoom = await newRoom.save();
          room = saveRoom;

        } else {
          room = await Room.updateOne({ _id: data._id }, { $set: data });
        }
      })

      return room;
    }
    catch (err) {
      throw err;
    }
  }

  

  async addThumbnailImage(data: any) {
    try {
      await Property.findOne({ _id: data.propertyId }).then(async (resp: any) => {
        if (resp != null) {

          if (data.type == 1) {
            let thumbImages = resp.thumbImages
            thumbImages.push(data.thumbImage);
            return await Property.updateOne({ _id: data.propertyId }, {
              $set: {
                thumbImages: thumbImages
              }
            });
          }
          if (data.type == 2) {
            let propertyImages = resp.propertyImages
            propertyImages.push(data.thumbImage);
            return await Property.updateOne({ _id: data.propertyId }, {
              $set: {
                propertyImages: propertyImages
              }
            });
          }
          if (data.type == 3) {
            let videos = resp.videos
            videos.push(data.thumbImage);
            return await Property.updateOne({ _id: data.propertyId }, {
              $set: {
                videos: videos
              }
            });
          }
          if (data.type == 4) {
            let images350 = resp.images350
            images350.push(data.thumbImage);
            return await Property.updateOne({ _id: data.propertyId }, {
              $set: {
                images350: images350
              }
            });
          }

        }
      })
    }
    catch (err) {
      throw err;
    }
  }


  async getPropertyById(data: any) {
    try {

      //let property;

      return await Property.findOne({ _id: data.propertyId }).then(async (resp:any) => {
       return await Room.find({propertyId:data.propertyId}).then((rooms) => {
          return {
            property:resp,
            rooms:rooms
          }
        });
        
      });

    } catch (error) {
      throw error;
    }
  }

} // end class
