import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/init-page/login/login.component';
import { InitPageComponent } from './authentication/init-page/init-page.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: InitPageComponent, data: { page: 'login' } },
  { path: 'register', component: InitPageComponent, data: { page: 'register' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
