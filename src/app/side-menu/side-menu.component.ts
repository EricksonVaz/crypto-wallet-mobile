import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItem, IonList, MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalProfileComponent } from '../components/modal-profile/modal-profile.component';
import User from '../models/user';
import Web3Obj from '../models/web3Obj';
import { SideMenuService } from '../services/side-menu.service';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab3Page } from '../tab3/tab3.page';
import swal from '../utils/sweetalert';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  isOpen=false;
  private readonly IDMENU = "side-menu";
  subscription:Subscription;
  networks = environment.networks;
  routerOutlet:any;

  static component:SideMenuComponent;

  constructor(private sideMenuService:SideMenuService,private menu: MenuController,private modalController:ModalController,private router:Router,) {
    this.subscription = this.sideMenuService.onToggle().subscribe((state)=>{
      this.openSideMenu();
    });
    SideMenuComponent.component = this;
  }

  ngOnInit() {
    this.routerOutlet = document.querySelector("ion-router-outlet");
  }

  openSideMenu(){
    console.log(this.IDMENU)
    this.menu.enable(true,this.IDMENU);
    this.menu.open(this.IDMENU);
  }

  selectNetwork(network:any,containerNet:IonList,itemClicked:IonItem){
    let containerIonList = containerNet["el"];
    let itemList = itemClicked["el"];

    let ionItemAlreadySelected = containerIonList.querySelector(".selected");
    ionItemAlreadySelected?.classList.remove("selected");
    itemList.classList.add("selected");

    console.log("network",network);

    Web3Obj.networkInfo = network;

    Tab1Page.component.updateNetworkInfo();
    Tab1Page.component.showAccountBalance();

    Tab3Page.component.getNetworkInfo();
    Tab3Page.component.updateListtransactions();
    this.menu.close(this.IDMENU);
  }

  async openModalPerfil(){
    const modal = await this.modalController.create({
      component: ModalProfileComponent,
      cssClass: 'my-custom-class'
    });
    this.menu.close(this.IDMENU);
    await modal.present();
  }

  dismissModalProfile() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  logOut(){
    this.menu.close(this.IDMENU);
    User.logout(()=>{
      this.router.navigateByUrl('login');
    },(err:any)=>{
      swal({
        title: "Error",
        text: "Erro ao realizar logout",
        icon: "error"
      });
      console.log(err)
    });
  }

}
