import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { JamsilModule } from './jamsil/jamsil.module';
import { RndModule } from './rnd/rnd.module';
import { SingleModule } from './single/single.module';

import { AppComponent } from './app.component';

import { HttpModule, JsonpModule } from '@angular/http';
import { DelaService } from './dela/dela.service';
import { Jsonp } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    JamsilModule,
    RndModule,
    SingleModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
