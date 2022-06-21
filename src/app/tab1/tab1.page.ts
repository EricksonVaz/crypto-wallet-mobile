import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonItem, IonList, IonRouterOutlet, MenuController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import {Clipboard} from '@angular/cdk/clipboard';
import { ModalAddAccountComponent } from '../components/modal-add-account/modal-add-account.component';
import Account from '../models/account';
import IAccount from '../utils/interfaces/iAccount';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  isAccountSelected = false;
  accountSelected = environment.defaultNetwork;
  accounts:IAccount[] = []

  routerOutlet:any;
  private readonly IDMENU = "tab-1";
  static component:Tab1Page;

  constructor(private modalController:ModalController,private menu: MenuController, private clipBoard:Clipboard) {
    this.routerOutlet = document.querySelector("ion-router-outlet");
    Tab1Page.component = this;
  }

  ngOnInit(): void {
    this.updateListAccounts();
  }

  selectAccount(account:any,itemClicked:IonItem,containerAccountList:IonList){
    let accountList = containerAccountList["el"];
    let itemlist = itemClicked["el"];

    let itemAlreadySelected = accountList.querySelector(".selected");
    itemAlreadySelected?.classList.remove("selected");
    itemlist.classList.add("selected");

    this.isAccountSelected = true;
    console.log("account", account);

  }

  async openModalAddNewAccount(){
    const modal = await this.modalController.create({
      component: ModalAddAccountComponent,
      cssClass: 'modal-add-account'
    });
    this.menu.close(this.IDMENU);
    await modal.present();
  }

  dismissModalAddAccount() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  updateListAccounts(){
    Account.listAll().then(resp=>{
      this.accounts = resp;
    });
  }

  copyAddress(value:string){
    this.clipBoard.copy(value||"");
  }

}
