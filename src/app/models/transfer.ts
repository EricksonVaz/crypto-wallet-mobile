import { Database, getDatabase, push, ref, set,child,get } from "@angular/fire/database";
import IFormError from "../utils/interfaces/iformError";
import ITransfer from "../utils/interfaces/iTransfer";
import Account from "./account";
import User from "./user";
import Web3Obj from "./web3Obj";

export default class Transfer{
  private to:string="";
  private amount:string="";
  private datetime:string="";
  private password:string="";

  private _formError:IFormError[] = [];
  private _db?:Database;

  private static readonly api_get_datetime = "https://timeapi.io/api/Time/current/ip?ipAddress=41.221.207.2";

  constructor(private formData:ITransfer,private from:string,private private_key:string){
    this._db = getDatabase();
    if(this.checkFormData()){
      this.amount = formData.amount;
      this.to = formData.to;
      this.password = formData.password!;

      this.validate();
    }else{
      this._formError.push({
        formControl: "amount",
        errorFeedback: "dados invalido",
        currentValue: this.amount
      });
    }
  }

  get formError(){
    return this._formError;
  }

  transferAmount():Promise<ITransfer|IFormError[]>{
    return new Promise(async(resolve,reject)=>{
      if(await User.validatePassword(this.password)){
        new Web3Obj().initWeb3().then(async (web3)=>{
        web3.eth.accounts.signTransaction({

            to:this.to,
            value: +this.amount * Account.WEIAMOUNT,
            gas:"200000"

        },this.private_key.substring(2),(err,res)=>{
            if(err) reject(err);
            else if(res.rawTransaction)
            web3.eth.sendSignedTransaction(res.rawTransaction,async(err,res)=>{
                if(err) reject({
                        formControl: "amount",
                        errorFeedback: err,
                        currentValue: this.amount
                      })
                else{

                  /* let respApi = await fetch(Transfer.api_get_datetime);
                  let objResp = await respApi.json(); */
                  this.datetime = new Date().toLocaleString()

                  resolve({
                    amount:this.amount,
                    to:this.to,
                    from:this.from,
                    datetime:this.datetime
                  });
                }
            });
        });
      });
      }else{
        this._formError.push({
          formControl: "password",
          errorFeedback: "password incorrecto",
          currentValue: this.password
        });
        resolve(this._formError);
      }
    });
  }

  saveTransaction(transferObj:ITransfer){
    let uidUser = User.userLogged()?.uid;
    push(ref(this._db!, 'users/' + uidUser + '/accounts/'+this.private_key+'/transactions/'+Web3Obj.networkInfo.uuid), transferObj);
  }

  static async listAll(private_key:string){
    let dbRef = ref(getDatabase());
    let userUid = User.userLogged()?.uid;

    return get(child(dbRef, `users/${userUid}/accounts/${private_key}/transactions/${Web3Obj.networkInfo.uuid}`))
    .then((snapshot) => {
      return Object.values(snapshot.val()) as ITransfer[];
    }).catch((error) => {
      //console.log("error search accounts",error)
      let arrResp:ITransfer[] = [];
      return arrResp;
    });
  }

  private checkFormData(): boolean{
    if("amount" in this.formData && "to" in this.formData && "password" in this.formData){
      return true;
    }

    return false;
  }

  private validate(){
    if(!this.amount){
      this._formError.push({
        formControl:"amount",
        errorFeedback:"valor é obrigatório",
        currentValue:this.amount
      });
    }else if(isNaN(+this.amount)){
      this._formError.push({
        formControl:"amount",
        errorFeedback:"degite um numero válido",
        currentValue:this.amount
      });
    }

    if(!this.to){
      this._formError.push({
        formControl:"to",
        errorFeedback:"endereço destino é obrigatório",
        currentValue:this.to
      });
    }else if(this.to.length<42){
      this._formError.push({
        formControl:"to",
        errorFeedback:"degite um endereço válido",
        currentValue:this.to
      });
    }

    if(!this.password){
      this._formError.push({
        formControl:"password",
        errorFeedback:"password é obrigatório",
        currentValue:this.password
      });
    }
  }
}
