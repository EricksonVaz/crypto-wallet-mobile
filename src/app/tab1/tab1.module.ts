import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ModalAddAccountComponent } from '../components/modal-add-account/modal-add-account.component';
import { ModalEditAccountComponent } from '../components/modal-edit-account/modal-edit-account.component';
import { ModalGetKeyComponent } from '../components/modal-get-key/modal-get-key.component';
import { ShareModule } from '../utils/share/share.module';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShareModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    QRCodeModule
  ],
  declarations: [Tab1Page,ModalAddAccountComponent,ModalEditAccountComponent,ModalGetKeyComponent,ToolbarComponent],
  exports:[ToolbarComponent]
})
export class Tab1PageModule {}
