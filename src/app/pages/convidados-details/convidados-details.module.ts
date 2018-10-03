import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConvidadosDetailsPage } from './convidados-details.page';

const routes: Routes = [
  {
    path: '',
    component: ConvidadosDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConvidadosDetailsPage]
})
export class ConvidadosDetailsPageModule {}
