import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { RegistrationPageComponent } from './pages/auth/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { HomePageComponent } from './pages/main-pages/home-page/home-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ProjectsAdminComponent } from './pages/main-pages/admin-pages/projects-admin-page/projects-admin.component';
import { ProjectsUserComponent } from './pages/main-pages/projects-user-page/projects-user.component';
import { UsersAdminComponent } from './pages/main-pages/admin-pages/users-admin-page/users-admin.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserCardComponent } from './components/user-card/user-card.component';
import { VariableModalComponent } from './components/variable-modal/variable-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectInfoComponent } from './pages/main-pages/admin-pages/project-info/project-info.component';
import { CommentComponent } from './components/comment/comment.component';
import {AuthInterceptor} from "./shared/inteceptors/auth.interceptor";
import { ChartsModule } from 'ng2-charts';
import { MyPieChartComponent } from './components/charts/my-pie-chart/my-pie-chart.component';
import { ModalReportComponent } from './components/modal-report/modal-report.component';
import { UserInfoComponent } from './pages/main-pages/admin-pages/user-info/user-info.component';
import { MyBarChartComponent } from './components/charts/my-bar-chart/my-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    AuthLayoutComponent,
    ProjectsAdminComponent,
    ProjectsUserComponent,
    UsersAdminComponent,
    ProgressSpinnerComponent,
    ProjectCardComponent,
    FilterPipe,
    ModalComponent,
    UserCardComponent,
    VariableModalComponent,
    ProjectInfoComponent,
    CommentComponent,
    MyPieChartComponent,
    ModalReportComponent,
    UserInfoComponent,
    MyBarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [VariableModalComponent, ModalComponent],
  bootstrap: [AppComponent],

})
export class AppModule { }
