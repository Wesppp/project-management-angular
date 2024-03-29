import {Component, OnInit} from '@angular/core';
import {AuthService} from "./pages/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'project-management';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.checkLoginStatus()
  }
}
