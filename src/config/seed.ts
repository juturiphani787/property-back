import { MongoConfig } from "./MongoConfig";
import { UserSeed } from "./seeds/UserSeed";
import { User, IUser } from "../models/User";
import crypto from "crypto";

export class Seed {
    static runUserSeeding() {

        let users = UserSeed.users;
        let mongoose = require('mongoose');
        mongoose.connect(MongoConfig.SETUP.URL);

        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));

        db.once('open', function () {
            users.forEach((user: any) => {
                user.password = crypto
                    .createHash("md5")
                    .update(user.password)
                    .digest("hex");
            });
            User.collection.insert(users, (err, docs) => {
                if (err) {
                    return console.error(err);
                } else {
                    //console.log(docs);
                    return console.log("Users added successfully");
                }
            });
        });
    }

}
Seed.runUserSeeding();