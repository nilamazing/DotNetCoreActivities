import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Activity } from "../Entities/Activity";

export default class ActivityStore{
    activities:Activity[]=[];
    activity:Activity=null;
    isDisplayCreateForm:boolean=false;
    isLoading:boolean=true;
    constructor(){
        makeAutoObservable(this)
    }
   setActivities=(inputActivities:Activity[])=>{
       this.activities=inputActivities
   }
   setIsDisplayCreateForm=(displayMode:boolean)=>{
       this.isDisplayCreateForm=displayMode;
   }
   setIsLoading=(loadingMode:boolean)=>{
       this.isLoading=loadingMode;
   }
   setActivity=(activityDetail:Activity)=>{
       this.activity=activityDetail;
   }
   appendActivity=(activityDetail:Activity)=>{
       this.activities.push(activityDetail);
   }
   deleteActivity=(activityDetail:Activity)=>{
       let indxToDelete = this.activities.findIndex(act=>act.id===activityDetail.id);
       if(indxToDelete > -1){
           this.activities.splice(indxToDelete,1);
       }
   }
//    updateActivity=(activityToUpdate:Activity)=>{
//      let indx = this.activities.findIndex(act=>{
//             act.id===activityToUpdate.id;
//         });
//     this.activities[indx]=activityToUpdate;
//    }
}