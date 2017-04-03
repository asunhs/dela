import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelaCommonModule } from '../dela/dela-common.module';
import { SingleRoutingModule } from './single-routing.module';

import { SingleComponent } from './single.component';

@NgModule({
  imports: [
    CommonModule,
    DelaCommonModule,
    SingleRoutingModule
  ],
  declarations: [
    SingleComponent
  ]
})
export class SingleModule { }
