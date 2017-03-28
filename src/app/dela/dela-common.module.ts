import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

import { UnescapePipe } from './unescape.pipe';
import { CaloriesPipe } from './calories.pipe';
import { ToNumberPipe } from './toNumber.pipe';
import { DiscountPipe } from './discount.pipe';
import { EntryPipe } from './entry.pipe';
import { PrefixPipe } from './prefix.pipe';
import { FolderDirective } from './folder.directive';

import { DelaService, LoadingService } from './dela.service';
import { Jsonp } from '@angular/http';

import { CardComponent } from './card/card.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    UnescapePipe,
    CaloriesPipe,
    ToNumberPipe,
    DiscountPipe,
    EntryPipe,
    PrefixPipe,
    FolderDirective,
    CardComponent,
    FilterComponent
  ],
  providers: [
    DelaService,
    LoadingService
  ],
  exports: [
    UnescapePipe,
    CaloriesPipe,
    ToNumberPipe,
    DiscountPipe,
    EntryPipe,
    PrefixPipe,
    FolderDirective,
    CardComponent,
    FilterComponent
  ]
})
export class DelaCommonModule { }
