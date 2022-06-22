import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { ModalAddAccountComponent } from '../components/modal-add-account/modal-add-account.component';
import { FormatPkPipe } from '../utils/pipes/format-pk.pipe';
import { ModalEditAccountComponent } from '../components/modal-edit-account/modal-edit-account.component';
import { ModalGetKeyComponent } from '../components/modal-get-key/modal-get-key.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page,ToolbarComponent,ModalAddAccountComponent,FormatPkPipe,ModalEditAccountComponent,ModalGetKeyComponent]
})
export class Tab1PageModule {}
