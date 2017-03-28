import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelaCommonModule } from '../dela/dela-common.module';
import { SangamRoutingModule } from './sangam-routing.module';

import { SangamComponent } from './sangam.component';

@NgModule({
  imports: [
    CommonModule,
    DelaCommonModule,
    SangamRoutingModule
  ],
  declarations: [
    SangamComponent
  ]
})
export class SangamModule { }
