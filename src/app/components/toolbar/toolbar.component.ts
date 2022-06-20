import { Component, Input, OnInit } from '@angular/core';
import { SideMenuService } from 'src/app/services/side-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title = "tab";
  subscription:Subscription;

  constructor(private sideMenuService:SideMenuService) {
  }

  ngOnInit() {}

  openMenu(){
    this.sideMenuService.toggleMenu();
  }

}
