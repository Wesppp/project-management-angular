import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {UserService} from "../../../../shared/services/user.service";
import {GlobalService} from "../../../../shared/services/global.service";
import {ActivatedRoute, Params} from "@angular/router";
import {IUser} from "../../../../shared/interfaces/user";
import {IReport} from "../../../../shared/interfaces/report";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user!: IUser
  reports: IReport[] = []
  isLoading: boolean = true

  constructor(private _location: Location,
              private userService: UserService,
              private globalService: GlobalService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getUser(params['id'])
      this.getUserReports(params['id'])
    }, error => this.globalService.customDangerAlert(error.message).then())
  }

  goBack() {
    this._location.back()
  }

  getUser(id: string) {
    this.userService.getUser(id)
      .subscribe(user => {
        if (user) {
          this.user = user
        } else {
          console.log('something went wrong')
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  getUserReports(id: string) {
    this.userService.getUserReports(id)
      .subscribe(reports => {
        if (reports && reports.length) {
          this.reports = reports
          this.isLoading = false
        } else {
          console.log('something went wrong')
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }
}
