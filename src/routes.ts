import { FileUtil } from './utils/FileUtil';
import { AppConstants } from './config/AppConstants';
import { FileController } from './controllers/FileController';
import { UserController } from './controllers/UserController';
import { UserRequestMiddleware } from './middlewares/UserRequestMiddleware';
import { PropertyManagementController } from './controllers/PropertyManagementController';
import path from 'path';

export class Routes {
  private userController = new UserController();
  private propertyManagementController = new PropertyManagementController();
  private fileController = new FileController()

  constructor() {

  }
  public routes(app: any): void {
    
    //Common
    app.post('/file/upload', FileUtil.uploader().array("files[]", AppConstants.FILE_UPLOAD_MAX_COUNT), this.fileController.uploadFiles)
    app.get('/files/:fileName', function (req: any, res: any) {
      try {
        res.sendFile(path.join(__dirname + '/../uploads/' + req.params.fileName));
      } catch (err) {
        res.status(404).send(err);
      }
    })

    //User Management
    app.post('/user/create', this.userController.createUser);
    app.post('/user/login', UserRequestMiddleware.verifyUserLoginRequest, this.userController.userLogin);
    app.post('/listAllRegisterUsers', this.userController.listAllRegisterUsers);
    app.post('/listUserBookings', this.userController.listUserBookings);

    //Property Management
    app.post('/listAllProperties', this.propertyManagementController.listAllProperties);
    app.post('/addProperty', this.propertyManagementController.addProperty);
    app.post('/getPropertyById', this.propertyManagementController.getPropertyById);
    app.post('/addThumbnailImage', this.propertyManagementController.addThumbnailImage);

    //Room
    app.post('/listPropertyRooms', this.propertyManagementController.listPropertyRooms);
    app.post('/addRoom', this.propertyManagementController.addRoom);

    //Bookings
    app.post('/listBookings', this.userController.listBookings);
  }
}


