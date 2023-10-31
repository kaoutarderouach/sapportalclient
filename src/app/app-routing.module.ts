import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackupsComponent } from './components/backups/backups.component';
import { CompteRendusComponent } from './components/compte-rendus/compte-rendus.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { EP1Component } from './components/ep1/ep1.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LogsComponent } from './components/logs/logs.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
 // {path: 'EP1', component: EP1Component , canActivate: [AuthGuard]},
  {path: 'backup', component:BackupsComponent, canActivate: [AuthGuard]},
  {path: 'log', component:LogsComponent, canActivate: [AuthGuard]},
  {path: 'compteRendu/:id', component: CompteRendusComponent, canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'jobs', component:JobsComponent , canActivate: [AuthGuard]},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'historique', component:HistoriqueComponent, canActivate: [AuthGuard]},
  {path: 'admin', component:AdminDashboardComponent},
  {path:'users', component:UserListComponent, canActivate: [AuthGuard]},
  {path: 'backup/:id', component: BackupsComponent, canActivate: [AuthGuard]},
  {path: 'log/:id', component:LogsComponent, canActivate: [AuthGuard]},
  {path: 'job/:id', component:JobsComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component:ProfileComponent,canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
