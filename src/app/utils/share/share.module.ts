import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPkPipe } from '../pipes/format-pk.pipe';
import { AppModule } from 'src/app/app.module';



@NgModule({
  declarations: [FormatPkPipe],
  imports: [
    CommonModule
  ],
  exports:[FormatPkPipe]
})
export class ShareModule { }
