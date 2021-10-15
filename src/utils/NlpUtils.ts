const natural = require('natural');
const classifier = new natural.BayesClassifier();
const clone = require('clone');
const fs = require('fs');
import { RuleModel } from "../models/Rule";
import { AutoIncrement } from "../models/AutoIncrement";
// import { delete } from "request";

var mongoose = require('mongoose');

//import * as trainingdata from '../config/NLPData/trainingdata.json'
//const traingingData = require('../config/NLPData/trainingdata.json');


// let traingingData = [
//     { text:"don't like", label:"high"},
//     { text:"rude", label:"high"},
//     { text:"irritating", label:"high"},
//     { text:"useless", label:"high"},
//     { text:"unhelpfull", label:"high"},
//     { text:"Goddamn", label:"high"},
//     { text:"bad", label:"high"},
//     { text:"Good", label:"low"},
//     { text:"greate ", label:"low"},
//     { text:"useful",label:"low"},
//     { text:"long time",lable:"high"},
//     { text:"took short time",lable:"medium"}
//  ]

//let traingingData1 = JSON.parse(fs.readFileSync(__dirname+'/../config/NLPData/training.json', 'utf-8'));

export class Nlp{
    static async getRules(requestDatas: any){
        let traingingData: any;
        try{
            let datas: any = await RuleModel.findOne({"profile_id":requestDatas._id})
            //console.log("Whcihd",datas)
            traingingData = datas.rules,
            //datas.forEach((item:any)=>{
               // traingingData.push({text: item.rule_name,label:item.rule_type})
            //})
            //console.log("jdjdjdjk",traingingData)
            this.trainClassifier(traingingData);
        }catch(err){
            return err
        }
    }
    static clasifyFeeds(data:any, requestData: any){
        this.getRules(requestData);
       // this.trainClassifier(traingingData);
        ////console.log("Feeds::",data)
        return this.processFeeds(data, requestData);
    }

    static trainClassifier(data:any){

        data.forEach((item:any)=>{
            classifier.addDocument(item.text,item.label)
        })
    
        classifier.train();
        return
    }

    static processFeeds(testData: any, requestData: any) {
        var processdData:any = [];    
        testData.forEach((item:any)=>{
            var status = classifier.classify(item.message);
            item.status = status;
            if(item.from==undefined){
                item.from = {
                    "name" : "zuqo",
                    "id":"107070811004374"
                }
                item.fb_comment_id =  item.id,
                item.feedsfrom = "fb",
                item.profile_id = requestData._id
            }
            processdData.push(clone(item));
        })
        
    
        return processdData
    
    }



    static async autoIncrement(type:any) {
        //console.log("called",type)
        try{
            let autoinc: any = await AutoIncrement.findOne()
            //// console.log("DKSDKSDK",autoinc,"autoinc")
            if(!autoinc){
                autoinc = new AutoIncrement({
                    payswiff: 100,
                    canara: 200,
                    axis: 300
                });
            }
            var gen_id = "";
            if (type == "payswiff") {
                autoinc.payswiff = autoinc.payswiff + 1;
               var temp_yachet_id = autoinc.canara.toString();
                var yachet_id = "" +
                        temp_yachet_id.substring(0, 2) +
                        temp_yachet_id.substring(4, 5) +
                        temp_yachet_id.substring(2, 4) +
                        temp_yachet_id.substring(5, temp_yachet_id.length);
                gen_id = yachet_id;
            } else if (type == "canara") {
                autoinc.canara = autoinc.canara + 1;
                var temp_yachet_id = autoinc.canara.toString();
                var yachet_id = "" +
                        temp_yachet_id.substring(0, 2) +
                        temp_yachet_id.substring(4, 5) +
                        temp_yachet_id.substring(2, 4) +
                        temp_yachet_id.substring(5, temp_yachet_id.length);
                gen_id = yachet_id;
            } else if (type == "axis") {
                autoinc.axis = autoinc.axis + 1;
                var temp_yachet_id = autoinc.axis.toString();
                var yachet_id = "" +
                        temp_yachet_id.substring(0, 2) +
                        temp_yachet_id.substring(4, 5) +
                        temp_yachet_id.substring(2, 4) +
                        temp_yachet_id.substring(5, temp_yachet_id.length);
                gen_id = yachet_id;
            }
            let _id = autoinc._id
            delete autoinc._id;
            delete autoinc._v
            //// console.log("jdjdjdjk",autoinc,_id)
        
            let result = await AutoIncrement.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id)},{$set:autoinc})
            return autoinc;

        }catch(err){
            //console.log(err,"eroorororororo")
            return err
        }

    
}
    
}