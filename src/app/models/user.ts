import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,getAuth,signOut } from "@angular/fire/auth";
import { child, get, getDatabase, ref, set, update } from "@angular/fire/database";
import { sendPasswordResetEmail } from "@firebase/auth";
import EUserAction from "../utils/enums/EUserActions";
import { generateHash, verifyHash } from "../utils/functions";
import IFormError from "../utils/interfaces/iformError";
import IUser from "../utils/interfaces/iuser";

export default class User{
  private uid:string = "";
  private email:string = "";
  private password:string = "";
  private confirm:string = "";
  private _formError:IFormError[] = [];
  private auth:Auth;

  private static readonly regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private formData:IUser,private action=EUserAction.login){
    this.auth = getAuth();

    if(this.checkFormData()){
      this.email = formData.email;

      if(
        this.action===EUserAction.login ||
        this.action===EUserAction.signup
      )
      this.password = formData.password!;

      if(this.action===EUserAction.signup) this.confirm = formData.confirm!

      this.validate();
    }else{
      this._formError.push({
        formControl: "email",
        errorFeedback: "dados invalido",
        currentValue: this.email
      });
    }
  }

  signUp(){
    return new Promise((resolve,reject)=>{
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("userCredential(signUp)",user);
        if(user){
          this.uid = user.uid;
          this.registerUser();
          resolve(user);
        }
        else reject(
          {
            formControl: "email",
            errorFeedback: "erro ao registar novo usuario",
            currentValue: this.email
          }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        reject({
          formControl: "email",
          errorFeedback: errorMessage,
          currentValue: this.email
        });
      });
    });
  }

  login(){
    return new Promise((resolve,reject)=>{
      signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        if(user){
          this.syncPassword();
          resolve(user);
        }
        else reject(
          {
            formControl: "email",
            errorFeedback: "Email ou Password invalidos",
            currentValue: this.email
          }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);//auth/wrong-password
        let newError = errorCode
        if(errorCode=="auth/user-not-found") newError = "Utilizador não registrado";
        else if(errorCode=="auth/wrong-password") newError = "Email ou password incorecto";

        reject(
          {
            formControl: "email",
            errorFeedback: newError,
            currentValue: this.email
          }
        );
      });
    });
  }

  reset(){
    return new Promise((resolve,reject)=>{
      sendPasswordResetEmail(this.auth,this.email)
      .then(() => {
        // Password reset email sent!
        resolve("email send");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject({
          formControl: "email",
          errorFeedback: errorMessage,
          currentValue: this.email
        });
      });
    })
  }

  static logout(cb:Function,errCb?:Function){
    signOut(getAuth()).then(() => {
      cb();
    }).catch((error) => {
      if(errCb) errCb(error);
    });
  }

  get formError(){
    return this._formError;
  }

  private async syncPassword(){
    if(!(await User.validatePassword(this.password))){
      const db = getDatabase();
      update(ref(db, 'users/' + User.userLogged()?.uid),{
        password:generateHash(this.password)
      });
    }
  }

  private registerUser(){
    const db = getDatabase();
    set(ref(db, 'users/' + this.uid), {
      email: this.email,
      password : generateHash(this.password)
    });

  }
  private validate(){
    if(!this.email){
      this._formError.push({
        formControl: "email",
        errorFeedback: "email é obrigatorio",
        currentValue: this.email
      });
    }else if(!User.regexEmail.test(this.email)){
      this._formError.push({
        formControl: "email",
        errorFeedback: "email inválido",
        currentValue: this.email
      });
    }

    if(
        this.action===EUserAction.login ||
        this.action===EUserAction.signup
    ){
      if(!this.password){
        this._formError.push({
          formControl: "password",
          errorFeedback: "password é obrigatorio",
          currentValue: this.password
        });
      }
    }

    if(this.action==EUserAction.signup){
      //variable regex validate email
      if(!this.confirm){
        this._formError.push({
          formControl: "confirm",
          errorFeedback: "confirme o password primeiro",
          currentValue: this.confirm
        });
      }else if(this.confirm.length && this.password.length){
        if(this.confirm!==this.password){
          this._formError.push({
            formControl: "confirm",
            errorFeedback: "confirme o password primeiro",
            currentValue: this.confirm
          });
        }
      }
    }
  }

  static isLogged(){
    const user = getAuth().currentUser;

    if (user) return true;
    return false;
  }

  static userLogged(){
    return getAuth().currentUser
  }

  static async getUserPassword():Promise<string>{
    let dbRef = ref(getDatabase());
    let userUid = User.userLogged()?.uid;

    return get(child(dbRef, `users/${userUid}`))
    .then((snapshot) => {
      if(snapshot.exists()){
        return snapshot.val()["password"] || "";
      }
      return "";
    }).catch((error) => {
      console.log("error search accounts",error)
      return "";
    });
  }

  static async validatePassword(password:string){
    let passwordHash = await User.getUserPassword();
    return verifyHash(passwordHash,password);
  }

  private checkFormData(): boolean{
    if(
      this.action===EUserAction.signup &&
      ("email" in this.formData && "password" in this.formData && "confirm" in this.formData)
    ){
      return true;
    }else if(
      this.action===EUserAction.login &&
      ("email" in this.formData && "password" in this.formData)
    ){
      return true;
    }else if(
      this.action===EUserAction.reset &&
      ("email" in this.formData)
    ){
      return true;
    }

    return false;

  }
}
