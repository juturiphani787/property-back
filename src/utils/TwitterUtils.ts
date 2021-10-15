const Tw = require('twitter');
const Ts = require('twit');
import { AppConstants } from "../config/AppConstants";
import { RuleModel } from "../models/Rule";
import { FaceBookModel } from "../models/FaceBook";

import { reject, resolve } from "bluebird";

var client = new Tw({
    consumer_key: AppConstants.Twitter.consumer_key,
    consumer_secret: AppConstants.Twitter.consumer_secret,
    access_token_key: AppConstants.Twitter.access_token_key,
    access_token_secret: AppConstants.Twitter.access_token_secret
  });

var clients = new Ts({
  consumer_key: AppConstants.Twitter.consumer_key,
  consumer_secret: AppConstants.Twitter.consumer_secret,
  access_token: AppConstants.Twitter.access_token_key,
  access_token_secret: AppConstants.Twitter.access_token_secret
})


  export class TwitterUtils{

    static async getTweetsByTag(options:any){
       //console.log("kksksks",options)
       let user: any = await RuleModel.findOne({profile_id:options._id});
      ////  console.log("Userssdsdsd",user.hashtags)
        return new Promise((resolve,reject)=>{
          ////console.log("Userssdsdsd",user.hashtags)
            let params = {q: '#zuqo',result_type:"recent",count:100};
            //let params = {"max_id":1265953111811788801,q:"KotakBankLtd","include_entities":1,"result_type":"recent"}
            client.get('search/tweets', params,(error:any, tweets:any)=>{
              if (error) {
               return reject(error)
              }
              //console.log("djdjdjdjdj",tweets.statuses[0])
              return resolve(tweets)
            });
        })
       
    }
    static async replyToTweet(options:any){
      //console.log("")
      let user: any = await FaceBookModel.findOneAndUpdate({fb_comment_id:options.reply_to_id},{$set:{assignedStatus:'Replied'}},{ upsert: false });
      return new Promise((resolve,reject)=>{
        let params = {status: options.text +' @'+options.screen_name ,in_reply_to_status_id: options.reply_to_id};
        //let params = {"max_id":1265953111811788801,q:"KotakBankLtd","include_entities":1,"result_type":"recent"}
        clients.post('statuses/update', params,(error:any, tweets:any)=>{
          if (error) {
           return reject(error)
          }
          return resolve(tweets)
        });
    })
    }

    static async tweetDirectMessage(options:any){
      //console.log("")

      return new Promise((resolve,reject)=>{
        let params = {"event": 
        {"type": "message_create", 
        "message_create": {"target":
         {"recipient_id": options.user_id},
          "message_data": 
          {"text": options.text}}}};
        //let params = {"max_id":1265953111811788801,q:"KotakBankLtd","include_entities":1,"result_type":"recent"}
        clients.post('direct_messages/events/new', params,(error:any, tweets:any)=>{
          if (error) {
           return reject(error)
          }
          return resolve(tweets)
        });
    })
    }

    static async getTweetDirectMessage(){
      //console.log("")

      return new Promise((resolve,reject)=>{
        // let params = {"event": 
        // {"type": "message_create", 
        // "message_create": {"target":
        //  {"recipient_id": options.user_id},
        //   "message_data": 
        //   {"text": options.text}}}};
        //let params = {"max_id":1265953111811788801,q:"KotakBankLtd","include_entities":1,"result_type":"recent"}
        clients.get('/direct_messages/events/list',(error:any, tweets:any)=>{
          if (error) {
           return reject(error)
          }
          return resolve(tweets)
        });
    })
    }

    static async postTweet(options:any){

    }

  }