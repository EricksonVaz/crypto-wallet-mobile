import EAccountAction from "../utils/enums/EAccountActions";
import IAccount from "../utils/interfaces/iAccount";
import IFormError from "../utils/interfaces/iformError";
import User from "./user";
import Web3Obj from "./web3Obj";
import { getDatabase, ref, child, push, update,set, Database, get } from "@angular/fire/database";


export default class Account{
  private name:string = "";
  private private_key?:string = "";
  private public_key?:string;
  private _formError:IFormError[] = [];
  private _db?:Database;
  static readonly WEIAMOUNT = 1000000000000000000;

  constructor(private formData:IAccount,private action=EAccountAction.create){
    this._db = getDatabase();
    if(this.checkFormData()){
      this.name = formData.name;

      if(this.action===EAccountAction.create)
      this.private_key = formData.private_key!;

      this.validate();
    }else{
      this._formError.push({
        formControl: "name",
        errorFeedback: "dados invalido",
        currentValue: this.name
      });
    }
  }

  create(){
    return new Promise((resolve,reject)=>{
        new Web3Obj().initWeb3().then(async (web3)=>{
          let accountInfo = web3.eth.accounts.privateKeyToAccount(this.private_key!);
          let uidUser = User.userLogged()?.uid;
          let exist = await this.accountExist()
          if(uidUser && !exist){
            set(ref(this._db!, 'users/' + uidUser + '/accounts/'+accountInfo.privateKey), {
              name: this.name,
              public_key: accountInfo.address,
              private_key : accountInfo.privateKey!
            });
            resolve("ok");
          }else if(exist){
            reject({
              formControl: "private_key",
              errorFeedback: "Esta conta já foi registrada",
              currentValue: this.private_key
            })
          }else{
            reject({
              formControl: "name",
              errorFeedback: "Utilizador não especificado",
              currentValue: this.name
            })
          }
        }).catch((err:any)=>{
          reject({
            formControl: "name",
            errorFeedback: err,
            currentValue: this.name
          });
        });
    });
  }

  update(private_key:string):Promise<IAccount>{
    return new Promise((resolve,reject)=>{
        new Web3Obj().initWeb3().then(async (web3)=>{
          let accountInfo = web3.eth.accounts.privateKeyToAccount(private_key!);
          let uidUser = User.userLogged()?.uid;
          if(uidUser){
            let newAccountInfo:IAccount = {
              name: this.name,
              public_key: accountInfo.address,
              private_key : accountInfo.privateKey!
            }
            update(ref(this._db!, 'users/' + uidUser + '/accounts/'+accountInfo.privateKey),
            newAccountInfo);
            resolve(newAccountInfo);
          }else{
            reject({
              formControl: "name",
              errorFeedback: "Utilizador não especificado",
              currentValue: this.name
            })
          }
        }).catch((err:any)=>{
          reject({
            formControl: "name",
            errorFeedback: err,
            currentValue: this.name
          });
        });
    });
  }

  static async listAll(){
    let dbRef = ref(getDatabase());
    let userUid = User.userLogged()?.uid;

    return get(child(dbRef, `users/${userUid}/accounts/`))
    .then((snapshot) => {
      return Object.values(snapshot.val()) as IAccount[];
    }).catch((error) => {
      console.log("error search accounts",error)
      let arrResp:IAccount[] = [];
      return arrResp;
    });
  }

  static async balance(public_key:string){
    try{
      let web3 = await new Web3Obj().initWeb3();
      let amout = await web3.eth.getBalance(public_key);
      if(typeof amout =="string") return (+amout/Account.WEIAMOUNT).toString()
      return "0";
    }catch(err){
      return "0"
    }

  }

  static delete(privateKey:string){
    let uidUser = User.userLogged()?.uid;
    set(ref(getDatabase(), 'users/' + uidUser + '/accounts/'+privateKey),null);
  }

  get formError(){
    return this._formError;
  }

  private checkFormData(): boolean{
    if(
      this.action===EAccountAction.create &&
      ("name" in this.formData && "private_key" in this.formData)
    ){
      return true;
    }else if(
      this.action===EAccountAction.update &&
      ("name" in this.formData)
    ){
      return true;
    }

    return false;
  }

  private validate(){
    if(!this.name){
      this._formError.push({
        formControl: "name",
        errorFeedback: "nome da conta é obrigatorio",
        currentValue: this.name
      });
    }

    if(this.action===EAccountAction.create){
      if(!this.private_key){
        this._formError.push({
          formControl: "private_key",
          errorFeedback: "chave privada é obrigatorio",
          currentValue: this.private_key!
        });
      }else if(this.private_key.length<64){
        this._formError.push({
          formControl: "private_key",
          errorFeedback: "chave privada invalida",
          currentValue: this.private_key
        });
      }
    }
  }

  private async accountExist(){
    let dbRef = ref(this._db!);
    let userUid = User.userLogged()?.uid;

    return get(child(dbRef, `users/${userUid}/accounts/0x${this.private_key}`))
    .then((snapshot) => {
      return snapshot.exists();
    }).catch((error) => {
      console.log("error search accounts",error)
      return false
    });
  }
}
