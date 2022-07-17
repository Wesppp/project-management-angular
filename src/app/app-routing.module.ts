import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {LoginPageComponent} from "./pages/auth/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/auth/registration-page/registration-page.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {HomePageComponent} from "./pages/main-pages/home-page/home-page.component";
import {AuthGuard} from "./pages/auth/auth.guard";
import {LoggedInAuthGuard} from "./pages/auth/logged-in-auth.guard";
import {ProjectsAdminComponent} from "./pages/main-pages/admin-pages/projects-admin-page/projects-admin.component";
import {ProjectsUserComponent} from "./pages/main-pages/user-pages/projects-user-page/projects-user.component";
import {UsersAdminComponent} from "./pages/main-pages/admin-pages/users-admin-page/users-admin.component";
import {ProjectInfoComponent} from "./pages/main-pages/admin-pages/project-info/project-info.component";
import {UserInfoComponent} from "./pages/main-pages/admin-pages/user-info/user-info.component";
import {UserReportsPageComponent} from "./pages/main-pages/user-pages/user-reports-page/user-reports-page.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, canActivate: [LoggedInAuthGuard], children: [
      {path: '', redirectTo: '/login-page', pathMatch: 'full'},
      {path: 'login-page', component: LoginPageComponent},
      {path: 'registration-page', component: RegistrationPageComponent}
    ]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {path: '', redirectTo: '/home-page', pathMatch: 'full'},
      {path: 'home-page', component: HomePageComponent},
      {path: 'projects-admin-page', component: ProjectsAdminComponent, data: {roles: ['admin']}},
      {path: 'users-admin-page', component: UsersAdminComponent, data: {roles: ['admin']}},
      {path: 'projects-user-page', component: ProjectsUserComponent},
      {path: 'project-info/:id', component: ProjectInfoComponent},
      {path: 'user-info/:id', component: UserInfoComponent},
      {path: 'user-project-reports/:id', component: UserReportsPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
