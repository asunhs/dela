import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleComponent }    from './single.component';

const routes: Routes = [
  { path: 'sangam',  component: SingleComponent },
  { path: 'pangyo',  component: SingleComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SingleRoutingModule { }