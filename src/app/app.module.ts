import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EP1 } from './models/ep1';
import { EP1Component } from './components/ep1/ep1.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { BackupsComponent } from './components/backups/backups.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { CompteRendusComponent } from './components/compte-rendus/compte-rendus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageSelectorComponent } from './components/app-language-selector/app-language-selector.component';

import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilterComponent } from './components/filter/filter.component';
import { HeaderComponent } from './components/header/header.component';
import {ContentTypeInterceptor} from './interceptors/content-type.interceptor'
import { MainComponent } from './components/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniquePipe } from './pipes/unique.pipe';
import { HistoriqueComponent } from './components/historique/historique.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HistoryFilterComponent } from './components/history-filter/history-filter.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LogsComponent } from './components/logs/logs.component';
import { BadgesComponent } from './components/badges/badges.component';
import { FilterTypeComponent } from './components/filter-type/filter-type.component';


import { ProfileComponent } from './components/profile/profile.component';
import { TopWidgetsComponent } from './components/top-widgets/top-widgets.component';
import { SysByMonthComponent } from './components/sys-by-month/sys-by-month.component';
import { TranslocoRootModule } from './transloco-root.module';



@NgModule({
  declarations: [
    AppComponent,
    EP1Component,
    LanguageSelectorComponent,
    NavbarComponent,
    JobsComponent,
    BackupsComponent,
    FilterPipe,
    SortPipe,
    CompteRendusComponent,

    FooterComponent,
     SearchComponent,
     LoginComponent,
     DashboardComponent,
     FilterComponent,
     HeaderComponent,

     MainComponent,
      UniquePipe,
      HistoriqueComponent,
      CalendarComponent,
      HistoryFilterComponent,
      AdminDashboardComponent,
      UserListComponent,
      LogsComponent,
      BadgesComponent,
      FilterTypeComponent,
      ProfileComponent,
      TopWidgetsComponent,
      SysByMonthComponent,













  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    TranslocoRootModule

  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true }  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
