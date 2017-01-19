import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelaCommonModule } from '../dela/dela-common.module';
import { JamsilRoutingModule } from './jamsil-routing.module';

import { JamsilComponent } from './jamsil.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    DelaCommonModule,
    JamsilRoutingModule
  ],
  declarations: [
    JamsilComponent,
    CardComponent
  ]
})
export class JamsilModule { }
