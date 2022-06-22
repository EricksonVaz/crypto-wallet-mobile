import { Component, OnInit } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import Account from '../models/account';
import Transfer from '../models/transfer';
import Web3Obj from '../models/web3Obj';
import { Tab1Page } from '../tab1/tab1.page';
import { addFormFeedback, closeLoader, openLoader } from '../utils/functions';
import IAccount from '../utils/interfaces/iAccount';
import IFormError from '../utils/interfaces/iformError';
import ITransfer from '../utils/interfaces/iTransfer';
import swal from '../utils/sweetalert';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  accounts:IAccount[] = [];
  listTransactions:ITransfer[] = [];
  accountSelected:IAccount;
  isAccountSelected = false;
  networkInfo:any = Web3Obj.networkInfo;
  static component:Tab3Page;

  constructor() {
    Tab3Page.component = this;
  }

  ngOnInit(): void {
    this.getNetworkInfo();
    this.updateListAccounts();
  }

  setAccountSelected(select:IonSelect){
    let account = JSON.parse(select.value) as IAccount;
    this.accountSelected = account;
    this.isAccountSelected = true;

    console.log("account selected",this.accountSelected);

    this.getNetworkInfo();
    this.updateListtransactions();
  }

  updateListAccounts(){
    Account.listAll().then(resp=>{
      this.accounts = resp;
    });
  }

  updateListtransactions(){
    //console.log("private key",AccountDetailsComponent.component.accountSelected?.private_key!)
    Transfer.listAll(this.accountSelected?.private_key!)
    .then(transactions=>{
      this.listTransactions = transactions;
    });
  }

  getNetworkInfo(){
    this.networkInfo = Web3Obj.networkInfo;
  }

  submit(formObj:any,formElement:HTMLFormElement){
    let formData = formObj.value as ITransfer;
    let address = this.accountSelected?.public_key;
    let private_key = this.accountSelected?.private_key;

    if(!this.accountSelected){
      addFormFeedback(formElement,[
        {
          formControl:"from",
          errorFeedback:"Selecione uma conta primeiro",
          currentValue:""
        }
      ])
      return;
    }

    let transfer = new Transfer(formData,address!,private_key!);

    if(transfer.formError.length){
      addFormFeedback(formElement,transfer.formError);
    }else{
      openLoader();
      transfer.transferAmount()
      .then((resp)=>{
        if(Array.isArray(resp)){
          addFormFeedback(formElement, resp)
        }else{
          transfer.saveTransaction(resp);
          formElement.reset();
          swal({
            title: "Pronto",
            text: "Transação concluída com sucesso",
            icon: "success"
          });
          Tab1Page.component.showAccountBalance();
          this.updateListtransactions();
        }
      })
      .catch(resp=>{
        let errorFeedback = resp as IFormError
        addFormFeedback(formElement, [errorFeedback])
      })
      .finally(closeLoader);
    }
  }

}
