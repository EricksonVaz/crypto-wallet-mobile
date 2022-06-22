import User from "../models/user";
import IFormError from "./interfaces/iformError";

import * as shajs from 'sha.js';

export function addFormFeedback(form:HTMLFormElement,errorsFeedback:IFormError[]){
  errorsFeedback.forEach(error=>{
    let elementControl = form.querySelector(`[name="${error.formControl}"]`);

    if(elementControl){
      let elementFeedback = elementControl.parentElement.nextElementSibling as HTMLDivElement;
      elementFeedback.innerHTML = error.errorFeedback;
      setTimeout(()=>{
        elementFeedback!.innerHTML = "";
      },5000)
    }
  });
}

export function openLoader(){
  document.documentElement.querySelector(".container-loader")?.classList.remove("d-none");
}

export function closeLoader(){
  document.documentElement.querySelector(".container-loader")?.classList.add("d-none");
}

export function checkUserLoggedState(cb:Function,errCB:Function){
  openLoader();
  let timeOut = 0;
  let checkUserLogged = setInterval(()=>{
    timeOut++;
    if(User.isLogged()){
      cb();
      clearInterval(checkUserLogged);
      closeLoader();
    }
    if(timeOut>=3){
      errCB();
      closeLoader();
      clearInterval(checkUserLogged);
    }
  },1000);
}

export function generateHash(value:string){
  return shajs('sha256').update(value).digest('base64')
}

export function verifyHash(valueHashed:string,value:string){
  return valueHashed === shajs('sha256').update(value).digest('base64')
}
