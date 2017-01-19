import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelaCommonModule } from '../dela/dela-common.module';
import { RndRoutingModule } from './rnd-routing.module';

import { RndComponent } from './rnd.component';
import { CardComponent } from './card/card.component';
import { CafePipe } from './pipes/cafe.pipe';
import { MealPipe } from './pipes/meal.pipe';
import { PrefixPipe } from './pipes/prefix.pipe';

@NgModule({
  imports: [
    CommonModule,
    DelaCommonModule,
    RndRoutingModule
  ],
  declarations: [
    CardComponent,
    RndComponent,
    CafePipe,
    MealPipe,
    PrefixPipe
  ]
})
export class RndModule { }
