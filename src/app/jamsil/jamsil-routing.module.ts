import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JamsilComponent }    from './jamsil.component';

const routes: Routes = [
  { path: 'jamsil',  component: JamsilComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class JamsilRoutingModule { }