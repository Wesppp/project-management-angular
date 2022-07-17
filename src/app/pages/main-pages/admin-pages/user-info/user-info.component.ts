import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {UserService} from "../../../../shared/services/user.service";
import {GlobalService} from "../../../../shared/services/global.service";
import {ActivatedRoute, Params} from "@angular/router";
import {IUser} from "../../../../shared/interfaces/user";
import {IReport} from "../../../../shared/interfaces/report";
import {IProject} from "../../../../shared/interfaces/project";
import {ProjectService} from "../../../../shared/services/project.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user!: IUser
  reports: IReport[] = []
  projects: IProject[] = []
  isUserLoading: boolean = true
  isReportsLoading: boolean = true
  isEmpty: boolean = true
  public isCollapsed = false;

  constructor(private _location: Location,
              private userService: UserService,
              private projectService: ProjectService,
              private globalService: GlobalService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getUser(params['id'])
      this.getProjectsInUser(params['id'])
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
          this.isUserLoading = false
        } else {
          console.log('something went wrong')
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  getReports(id: string) {
    this.projectService.getProjectReports(id)
      .subscribe(reports => {
        if (reports && reports.length) {
          this.reports = [...this.reports, ...reports]
          this.isReportsLoading = false
        } else {
          this.isReportsLoading = false
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  getProjectsInUser(id: string) {
    this.userService.getProjectsInUser(id)
      .subscribe(projects => {
        if (projects && projects.length) {
          this.projects = projects
          this.getAllReports(projects)
        } else {
          this.isReportsLoading = false
        }
      },error => this.globalService.customDangerAlert(error.message).then())
  }

  getAllReports(projects: IProject[]) {
    projects.forEach(p => this.getReports(p._id!))
  }

  isNoReports(): boolean {
    return !this.reports.length
  }
}
