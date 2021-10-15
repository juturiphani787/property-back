
export class MongoConfig {
    static SETUP = {
       URL: process.env.MONGO_CONFIG_URL || 'mongodb://localhost/property-management'
    }
}