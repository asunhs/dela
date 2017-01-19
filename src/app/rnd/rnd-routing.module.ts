import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RndComponent }    from './rnd.component';

const routes: Routes = [
  { path: 'rnd',  component: RndComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RndRoutingModule { }