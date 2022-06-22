import { Component, OnInit } from '@angular/core';
import Account from 'src/app/models/account';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import EAccountAction from 'src/app/utils/enums/EAccountActions';
import { addFormFeedback, closeLoader, openLoader } from 'src/app/utils/functions';
import IAccount from 'src/app/utils/interfaces/iAccount';
import IFormError from 'src/app/utils/interfaces/iformError';
import swal from 'src/app/utils/sweetalert';

@Component({
  selector: 'modal-edit-account',
  templateUrl: './modal-edit-account.component.html',
  styleUrls: ['./modal-edit-account.component.scss'],
})
export class ModalEditAccountComponent implements OnInit {
  static component:ModalEditAccountComponent;

  private _privateKey?:string;

  constructor() {
    ModalEditAccountComponent.component = this;
  }

  ngOnInit() {
    this.privateKey = Tab1Page.component.accountSelected.private_key;
  }

  set privateKey(privateKey:string){
    this._privateKey = privateKey;
  }

  dismissModal(){
    Tab1Page.component.dismissModal();
  }

  submit(formObj:any,formElement:HTMLFormElement){
    let formData = formObj.value as IAccount;

    let account = new Account(formData,EAccountAction.update);

    if(account.formError.length){
      addFormFeedback(formElement,account.formError);
    }else{
      openLoader();
      account.update(this._privateKey!)
      .then((resp)=>{
        formElement.reset();
        swal({
          title: "Pronto",
          text: "Conta atualizada com sucesso",
          icon: "success"
        });
        Tab1Page.component.updateListAccounts();
        Tab1Page.component.accountSelected = resp;
      })
      .catch(resp=>{
        let errorFeedback = resp as IFormError
        addFormFeedback(formElement, [errorFeedback])
      })
      .finally(closeLoader);
    }
  }

}
