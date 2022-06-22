import { Component, OnInit } from '@angular/core';
import Account from 'src/app/models/account';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import { addFormFeedback, closeLoader, openLoader } from 'src/app/utils/functions';
import IAccount from 'src/app/utils/interfaces/iAccount';
import IFormError from 'src/app/utils/interfaces/iformError';
import swal from 'src/app/utils/sweetalert';

@Component({
  selector: 'modal-add-account',
  templateUrl: './modal-add-account.component.html',
  styleUrls: ['./modal-add-account.component.scss'],
})
export class ModalAddAccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  dismissModal(){
    Tab1Page.component.dismissModalAddAccount();
  }

  submit(formObj:any,formElement:HTMLFormElement){
    let formData = formObj.value as IAccount;

    let account = new Account(formData);

    if(account.formError.length){
      addFormFeedback(formElement,account.formError);
    }else{
      openLoader();
      account.create()
      .then((resp)=>{
        formElement.reset();
        swal({
          title: "Pronto",
          text: "Conta adicionada com sucesso",
          icon: "success"
        });
        Tab1Page.component.updateListAccounts();
      })
      .catch(resp=>{
        let errorFeedback = resp as IFormError
        addFormFeedback(formElement, [errorFeedback])
      })
      .finally(closeLoader);
    }
  }

}
