import { resolve, reject, any } from "bluebird";
//const logger = require('./LogUtils');
import { FaceBookModel } from "../models/FaceBook";


const FB = require('fb');

export class FaceBookUtils{
    static async getFBPostAndComments(data: any) {
        //console.log("dkdkdk",data)
          FB.setAccessToken(data.apikey);
          return  new Promise((resolve, reject) => {
            FB.api('me?fields=posts', async function (fbData: any) {
                if (!fbData || fbData.error) {
                    //console.log("Selvam", fbData)
                    //console.log(!fbData ? 'error occurred' : fbData.error);
                    reject(fbData.error);
                } else {
                    //console.log("Selvam RAm",fbData)
                    resolve(fbData)
                }
            })
        })         
    }

    static getComments(Id:any){
        //console.log(Id)
    
        return new Promise((resolve,reject)=>{
            FB.api(Id+'/comments',function(res:any){
                if(!res || res.error) {
                    //console.log(!res ? 'error occurred' : res.error);
                    reject(res.err);
                }
                resolve(res.data)
            })
        })
    }
    
    static convertMultiArryIntoSingleArry(data: any,type:any, requests: any) {
        let comments:any =[]
        data.forEach((items:any) => {
            items.forEach((item: any) => {
                item.fb_comment_id = item.id;
                item.feedsfrom = 'fb'
                item.profile_id = requests._id
                item.from = {
                    "name" : "Zuqo",
                    "id":"107070811004374"
                }
                if (type == 'reply')
                    item.commentType = 'reply'
                comments.push(item);
            })
        })
    
        return comments;
    }

    static convertMultiArryIntoSingleArryTwitter(data: any, requestData: any) {
        //console.log("Kidkkidkid",requestData)
        let datas = data.statuses;
        let comments:any =[]
        let info = {
            message:"",
            from:{
                name:"",
                id:"",
                profilepic:"",
                followers:"",
                friends:"",
                listed:"",
                retweet:"",
                screen_name:""
            },
            fb_comment_id:"",
           // status:"",
            feedsfrom:"",
            created_time:new Date(),
            profile_id:"",
        };
        datas.forEach((item:any) => {
            ////console.log("jsjsjs",item)
            info = {
                message:"",
                from:{
                    name:"",
                    id:"",
                    profilepic:"",
                    followers:"",
                    friends:"",
                    listed:"",
                    retweet:"",
                    screen_name:""
                },
                fb_comment_id:"",
               // status:"",
                feedsfrom:"",
                created_time:new Date(),
                profile_id:"",
            };
            //items.forEach((item: any) => {
                info.message = item.text;
                info.from.name = item.user.name,
                info.from.id = item.user.id_str,
                info.from.screen_name = item.user.screen_name,
                info.from.followers = item.user.followers_count,
                info.from.friends = item.user.friends_count,
                info.from.profilepic = item.user.profile_image_url_https
                info.from.listed = item.user.listed_count,
                info.from.retweet = item.retweet_count,
                info.fb_comment_id = item.id_str,
                //info.status = 'high',
                info.feedsfrom = "twitter",
                info.created_time = new Date()
                info.profile_id = requestData._id,

                comments.push(info);
            //})
        })
    
        return comments;
    }


    
    static async replyToComment(data:any) {
        FB.setAccessToken(data.apikey);
        let fbData: any = {};
        
        if (data.replyMsg != undefined)
            fbData.message = data.replyMsg;
        if (data.attachment_url != undefined)
            fbData.attachment_url = data.attachment_url;
        let user: any = await FaceBookModel.findOneAndUpdate({fb_comment_id:data.commentId},{$set:{assignedStatus:'Replied'}},{ upsert: false });

        return new Promise((resolve, reject)=>{
            FB.api(`/${data.commentId}/comments`, "POST", fbData, function (res: any) {
                var res0;
                //logger.info(res);
                if(!res || res.error) {
                    //console.log(!res ? 'error occurred' : res.error);
                    return reject(res.error)
                }
                resolve(res);
              
            })
        })
      
    }
}




