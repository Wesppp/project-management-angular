import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../pages/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  role!: string

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.role = this.authService.currentUser.role!
  }

  logout() {
    this.authService.logout()
  }
}
