import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';

const routes: Routes = [
  {
    path: '',
    component: CarListComponent
  },
  {
    path: 'CarDetails',
    component: CarDetailComponent
  },
  {
    path: '**', component: CarListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
