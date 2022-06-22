import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import { addFormFeedback } from 'src/app/utils/functions';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-modal-get-key',
  templateUrl: './modal-get-key.component.html',
  styleUrls: ['./modal-get-key.component.scss'],
})
export class ModalGetKeyComponent implements OnInit {

  showPrivateKey:boolean = false;
  privateKey:string = "";

  constructor(private clipBoard2:Clipboard) { }

  ngOnInit() {}

  dismissModal(){
    Tab1Page.component.dismissModal();
  }

  copyKey(value:string){
    this.clipBoard2.copy(value||"");
  }

  submit(formObj:any,formElement:HTMLFormElement){
    let formData = formObj.value as object;

    if("password" in formData){
      User.validatePassword((formData as any).password || "").then(resp=>{
        if(resp){
          this.privateKey = Tab1Page.component.accountSelected?.private_key!;
          formElement.reset();
          this.showPrivateKey = true;
        }else{
          addFormFeedback(formElement,[{
            formControl:"password",
            errorFeedback:"password incorrecto",
            currentValue:""
          }]);
        }
      });
    }else{
      addFormFeedback(formElement,[{
        formControl:"password",
        errorFeedback:"dados inválidos",
        currentValue:""
      }]);
    }
  }

}
