import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import EUserAction from 'src/app/utils/enums/EUserActions';
import { addFormFeedback, closeLoader, openLoader } from 'src/app/utils/functions';
import IFormError from 'src/app/utils/interfaces/iformError';
import IUser from 'src/app/utils/interfaces/iuser';
import swal from 'src/app/utils/sweetalert';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  submit(formObj:any,formElement:HTMLFormElement){
    let formData = formObj.value as IUser;

    let user = new User(formData,EUserAction.reset);

    if(user.formError.length){
      addFormFeedback(formElement,user.formError);
    }else{
      openLoader();
      user.reset()
      .then((resp)=>{
        formElement.reset();
        this.router.navigateByUrl("login");
        swal({
          title: "Pronto",
          text: "Link enviado para seu email",
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
