import { Component } from '@angular/core';
import { IonItem, IonList } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isAccountSelected = false;
  accountSelected = environment.defaultNetwork;
  accounts = [
    {
      name:"Conta A",
      address:"0xdgEb28"
    },
    {
      name:"Conta B",
      address:"0xdgEb28"
    },
    {
      name:"Conta C",
      address:"0xdgEb28"
    },
    {
      name:"Conta D",
      address:"0xdgEb28"
    },
    {
      name:"Conta E",
      address:"0xdgEb28"
    },
    {
      name:"Conta D",
      address:"0xdgEb28"
    },
    {
      name:"Conta D",
      address:"0xdgEb28"
    },
    {
      name:"Conta D",
      address:"0xdgEb28"
    },
    {
      name:"Conta D",
      address:"0xdgEb28"
    },
    {
      name:"Conta D",
      address:"0xdgEb28"
    },
    {
      name:"Conta D",
      address:"0xdgEb28"
    },
    {
      name:"Conta D",
      address:"0xdgEb28"
    },
  ]

  constructor() {}

  selectAccount(account:any,itemClicked:IonItem,containerAccountList:IonList){
    let accountList = containerAccountList["el"];
    let itemlist = itemClicked["el"];

    let itemAlreadySelected = accountList.querySelector(".selected");
    itemAlreadySelected?.classList.remove("selected");
    itemlist.classList.add("selected");

    this.isAccountSelected = true;
    console.log("account", account);

  }

  dismissModalPerfil(){
    alert("close")
  }

}
