import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContribuirComponent } from './contribuir/contribuir.component';
import { LocaisComponent } from './locais/locais.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contribuir', component: ContribuirComponent},
  { path: 'locais', component: LocaisComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
