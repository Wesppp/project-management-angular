import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../../shared/interfaces/user";
import {UserService} from "../../../../shared/services/user.service";
import {GlobalService} from "../../../../shared/services/global.service";
import {ReportService} from "../../../../shared/services/report.service";
import {IReport} from "../../../../shared/interfaces/report";
import {ChartDataSets} from "chart.js";
import moment from "moment";
import {Label} from "ng2-charts";

@Component({
  selector: 'app-users-admin-page',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss',
  '../../../../../assets/project-page-layout.scss']
})
export class UsersAdminComponent implements OnInit {
  search: string = '';
  toggle: number = 0
  isLoading: boolean = true;
  users: IUser[] = []
  reports!: IReport[]
  isEmpty: boolean = false;
  busyUsers!: number
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [{ data: [], label: 'Reports made' }];

  constructor(private userService: UserService,
              private globalService: GlobalService,
              private reportService: ReportService) { }

  ngOnInit(): void {
    this.getDates()
    this.getUsers()
    this.getReports()
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        if (users.length && users) {
          this.users = users.filter(el => !el.role?.includes('admin'))
          this.isLoading = false
          this.isEmpty = !this.users.length;
          this.busyUsers = this.getBusyUsers(users)
        } else {
          this.isLoading = false
          this.isEmpty = !this.users.length;
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  getBusyUsers(users: IUser[]): number {
    let busyUsers: number = 0
    users.forEach(u => {
      if (u.projects?.items.length) {
        busyUsers++
      }
    })
    return busyUsers
  }

  switch(num: number) {
    this.toggle = num
  }

  getReports() {
    this.reportService.getReports()
      .subscribe(reports => {
        if (reports && reports.length) {
          this.reports = reports
          this.calculateStatistics(reports)
        } else {
          this.reports = []
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  calculateStatistics(reports: IReport[]) {
    for(let i = 0; i < 5; i++) {
      let count = 0
      reports.forEach(r => {
        if (this.barChartLabels[i].includes(r.createDate?.split(',')[0]!)) count++
      })
      this.barChartData[0].data?.push(count)
    }
  }

  getDates() {
    for(let i = 0; i < 5; i++) {
      this.barChartLabels[i] = `${moment().subtract(i, 'days').format('DD.MM.YYYY')}`
    }
  }
}
