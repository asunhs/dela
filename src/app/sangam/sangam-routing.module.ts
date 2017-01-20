import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SangamComponent }    from './sangam.component';

const routes: Routes = [
  { path: 'sangam',  component: SangamComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SangamRoutingModule { }