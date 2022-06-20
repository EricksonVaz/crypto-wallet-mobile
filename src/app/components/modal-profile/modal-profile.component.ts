import { Component, OnInit } from '@angular/core';
import { SideMenuComponent } from 'src/app/side-menu/side-menu.component';

@Component({
  selector: 'modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss'],
})
export class ModalProfileComponent implements OnInit {
  currentModal:HTMLIonModalElement;

  constructor() {
  }

  ngOnInit() {}

  dismissModal(){
    SideMenuComponent.component.dismissModalProfile();
  }

}
