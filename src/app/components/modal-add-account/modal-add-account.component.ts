import { Component, OnInit } from '@angular/core';
import { Tab1Page } from 'src/app/tab1/tab1.page';

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

}
