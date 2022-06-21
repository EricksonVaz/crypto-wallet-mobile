import { updatePassword } from "@angular/fire/auth";
import { Database, getDatabase, ref, update } from "@angular/fire/database";
import { generateHash } from "../utils/functions";
import IFormError from "../utils/interfaces/iformError";
import IProfile from "../utils/interfaces/iProfile";
import User from "./user";

export default class Profile{
  private password:string = "";
  private newpassword:string = "";
  private confirm:string = "";
  private _formError:IFormError[] = [];
  private _db?:Database;

  constructor(private formData:IProfile){
    this._db = getDatabase();
    if(this.checkFormData()){
      this.password = this.formData.password;
      this.newpassword = this.formData.newpassword;
      this.confirm = this.formData.confirm;

      this.validate();
    }else{
      this._formError.push({
        formControl: "password",
        errorFeedback: "dados invalido",
        currentValue: this.password
      });
    }
  }

  get formError(){
    return this._formError;
  }

  async update():Promise<string|IFormError[]>{
    if(await User.validatePassword(this.password)){
      let uidUser = User.userLogged()?.uid;
      return update(ref(this._db!, 'users/' + uidUser),{
        password:generateHash(this.newpassword)
      }).then(async(resp)=>{
        console.log("User logged",User.userLogged())
        return updatePassword(User.userLogged()!, this.newpassword!)
        .then((resp) => {
          return "ok";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return [{
            formControl: "password",
            errorFeedback: error.message,
            currentValue: this.password
          }];
        });
      }).catch((err)=>{
        return [{
          formControl: "email",
          errorFeedback: "não foi possivel atualizar o password",
          currentValue: this.password
        }];
      });
    }else{
      return [{
        formControl: "password",
        errorFeedback: "password incorecto",
        currentValue: this.password
      }];
    }
  }

  private validate(){
    if(!this.password){
      this._formError.push({
        formControl: "password",
        errorFeedback: "campo obrigatorio",
        currentValue: this.password
      });
    }

    if(!this.newpassword){
      this._formError.push({
        formControl: "newpassword",
        errorFeedback: "campo obrigatorio",
        currentValue: this.newpassword
      });
    }else if(this.newpassword.length<6){
      this._formError.push({
        formControl: "newpassword",
        errorFeedback: "tem de ter no minímo 6 caracteres",
        currentValue: this.newpassword
      });
    }

    if(!this.confirm){
      this._formError.push({
        formControl: "confirm",
        errorFeedback: "campo obrigatorio",
        currentValue: this.confirm
      });
    }else if(this.confirm.length<6){
      this._formError.push({
        formControl: "confirm",
        errorFeedback: "tem de ter no minímo 6 caracteres",
        currentValue: this.confirm
      });
    }

    if(this.newpassword.length>=6 && this.confirm.length>=6){
      if(this.newpassword !== this.confirm){
        this._formError.push({
          formControl: "confirm",
          errorFeedback: "tem de ser igual ao novo password",
          currentValue: this.confirm
        });
      }
    }
  }

  private checkFormData(): boolean{
    if("password" in this.formData && "newpassword" in this.formData && "confirm" in this.formData){
      return true;
    }

    return false;
  }
}
