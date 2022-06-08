import { Injectable } from '@angular/core';
import {IUser} from "../../shared/interfaces/user";
import {Router} from "@angular/router";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser!: IUser
  constructor(private router: Router) { }

  login(res: any) {
    this.currentUser = res.signed_user
    this.router.navigate(['/home-page'])
    localStorage.setItem('token', res.token)
  }

  logout() {
    this.router.navigate(['/login-page'])
    localStorage.removeItem('token');
  }

  public get logIn(): boolean {
    this.checkLoginStatus()
    return (localStorage.getItem('token') !== null)
  }

  getJwtToken() {
    return localStorage.getItem('token')
  }

  checkLoginStatus() {
    try {
      let token = this.getJwtToken()
      this.currentUser = jwt_decode(token!)
    } catch (e) {
      console.log(e)
    }
  }
}
