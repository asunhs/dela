import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

import { DelaService } from './dela/dela.service';
import { UnescapePipe } from './dela/unescape.pipe';
import { CaloriesPipe } from './dela/calories.pipe';
import { ToNumberPipe } from './dela/toNumber.pipe';
import { DiscountPipe } from './dela/discount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    UnescapePipe,
    CaloriesPipe,
    ToNumberPipe,
    DiscountPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [DelaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
