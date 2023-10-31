import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BackupsComponent } from './components/backups/backups.component';
import { BadgesComponent } from './components/badges/badges.component';
import { CompteRendusComponent } from './components/compte-rendus/compte-rendus.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Ep1Component } from './components/ep1/ep1.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterTypeComponent } from './components/filter-type/filter-type.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { HistoryFilterComponent } from './components/history-filter/history-filter.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoginComponent } from './components/login/login.component';
import { LogsComponent } from './components/logs/logs.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { StatutByMonthComponent } from './components/statut-by-month/statut-by-month.component';
import { TopWidgetsComponent } from './components/top-widgets/top-widgets.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    BackupsComponent,
    BadgesComponent,
    CompteRendusComponent,
    DashboardComponent,
    Ep1Component,
    FilterComponent,
    FilterTypeComponent,
    FooterComponent,
    HeaderComponent,
    HistoriqueComponent,
    HistoryFilterComponent,
    JobsComponent,
    LoginComponent,
    LogsComponent,
    MainComponent,
    NavbarComponent,
    ProfileComponent,
    SearchComponent,
    StatutByMonthComponent,
    TopWidgetsComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
