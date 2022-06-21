import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import EUserAction from 'src/app/utils/enums/EUserActions';
import { addFormFeedback, closeLoader, openLoader } from 'src/app/utils/functions';
import IFormError from 'src/app/utils/interfaces/iformError';
import IUser from 'src/app/utils/interfaces/iuser';
import swal from 'src/app/utils/sweetalert';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  submit(formObj:any,formElement:HTMLFormElement){
    let formData = formObj.value as IUser;

    let user = new User(formData,EUserAction.signup);

    if(user.formError.length){
      addFormFeedback(formElement,user.formError);
    }else{
      openLoader();
      user.signUp()
      .then((resp)=>{
        console.log("userCredential(SignUp)",resp);
        formElement.reset();
        this.router.navigateByUrl("login");
        swal({
          title: "Pronto",
          text: "Utilizador registrado com sucesso",
          icon: "success"
        });
      })
      .catch(resp=>{
        let errorFeedback = resp as IFormError
        addFormFeedback(formElement, [errorFeedback])
      })
      .finally(closeLoader);
    }
  }

}
