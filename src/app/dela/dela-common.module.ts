import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

import { UnescapePipe } from './unescape.pipe';
import { CaloriesPipe } from './calories.pipe';
import { ToNumberPipe } from './toNumber.pipe';
import { DiscountPipe } from './discount.pipe';
import { FolderDirective } from './folder.directive';

import { DelaService, LoadingService } from './dela.service';
import { Jsonp } from '@angular/http';

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
    FolderDirective
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
    FolderDirective
  ]
})
export class DelaCommonModule { }
