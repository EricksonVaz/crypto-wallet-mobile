import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { addFormFeedback, checkUserLoggedState, closeLoader, openLoader } from 'src/app/utils/functions';
import IFormError from 'src/app/utils/interfaces/iformError';
import IUser from 'src/app/utils/interfaces/iuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router) {
  }

  ngOnInit() {
    checkUserLoggedState(()=>{
      this.router.navigateByUrl("tabs");
    });
  }

  ionViewWillEnter(){

  }

  submit(formObj:any,formElement:HTMLFormElement){
    let formData = formObj.value as IUser;

    console.log("formData",formData);

    let user = new User(formData);

    if(user.formError.length){
      addFormFeedback(formElement,user.formError);
    }else{
      openLoader();
      user.login()
      .then((resp)=>{
        console.log("userCredential(login)",resp);
        formElement.reset();
        this.router.navigateByUrl("tabs");
      })
      .catch(resp=>{
        let errorFeedback = resp as IFormError
        addFormFeedback(formElement, [errorFeedback])
      })
      .finally(closeLoader);
    }
  }

}
