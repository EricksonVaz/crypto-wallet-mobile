import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonItem, IonList, IonRouterOutlet, MenuController, ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import {Clipboard} from '@angular/cdk/clipboard';
import { ModalAddAccountComponent } from '../components/modal-add-account/modal-add-account.component';
import Account from '../models/account';
import IAccount from '../utils/interfaces/iAccount';
import Web3Obj from '../models/web3Obj';
import swal from '../utils/sweetalert';
import { ModalEditAccountComponent } from '../components/modal-edit-account/modal-edit-account.component';
import { ModalGetKeyComponent } from '../components/modal-get-key/modal-get-key.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  isAccountSelected = false;
  accountSelected:IAccount;
  accounts:IAccount[] = [];
  balance?:string;
  networkInfo = Web3Obj.networkInfo;

  routerOutlet:any;
  private readonly IDMENU = "tab-1";
  static component:Tab1Page;

  constructor(private modalController:ModalController,private menu: MenuController, private clipBoard:Clipboard,private toastController:ToastController) {
    this.routerOutlet = document.querySelector("ion-router-outlet");
    Tab1Page.component = this;
  }

  ngOnInit(): void {
    this.updateListAccounts();
  }

  selectAccount(account:IAccount,itemClicked:IonItem,containerAccountList:IonList){
    let accountList = containerAccountList["el"];
    let itemlist = itemClicked["el"];

    let itemAlreadySelected = accountList.querySelector(".selected");
    itemAlreadySelected?.classList.remove("selected");
    itemlist.classList.add("selected");

    this.isAccountSelected = true;
    console.log("account", account);
    this.accountSelected = account;
    this.balance = "0";

    this.showAccountBalance();
  }

  showAccountBalance(){
    Account.balance(this.accountSelected?.public_key!).then(amount=>{
      //console.log("amount",amount)
      if(typeof amount==="string") this.balance = amount;
    });
  }

  async openModalAddNewAccount(){
    const modal = await this.modalController.create({
      component: ModalAddAccountComponent,
      cssClass: 'modal-add-account'
    });
    this.menu.close(this.IDMENU);
    await modal.present();
  }

  async openModalEditAccount(){
    const modal = await this.modalController.create({
      component: ModalEditAccountComponent,
      cssClass: 'modal-edit-account'
    });
    await modal.present();
  }

  async openModalGetKey(){
    const modal = await this.modalController.create({
      component: ModalGetKeyComponent,
      cssClass: 'modal-get-key'
    });
    await modal.present();
  }

  dismissModal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  updateListAccounts(){
    Account.listAll().then(resp=>{
      this.accounts = resp;
    });
  }

  updateNetworkInfo(){
    this.networkInfo = Web3Obj.networkInfo;
  }

  deleteAccount(){
    swal({
      title: "Tens a certeza?",
      text: "Ao eliminar esta conta todo o histórico de transações se perderá",
      icon: "warning",
      buttons: ["cancelar","continuar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        Account.delete(this.accountSelected?.private_key!);
        this.updateListAccounts();
        this.isAccountSelected = false;
      }
    });
  }

  copyAddress(value:string){
    this.clipBoard.copy(value||"");
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Endereço copiado',
      duration: 2000
    });
    toast.present();
  }

  refreshPage(event:any){
    console.log("refresh",event);
    setTimeout(() => {
      this.updateListAccounts();
      event.target.complete();
    }, 2000);
  }

}
