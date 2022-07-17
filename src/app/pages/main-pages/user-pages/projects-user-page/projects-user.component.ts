import { Component, OnInit } from '@angular/core';
import {IProject} from "../../../../shared/interfaces/project";
import {AuthService} from "../../../auth/auth.service";
import {UserService} from "../../../../shared/services/user.service";
import {GlobalService} from "../../../../shared/services/global.service";

@Component({
  selector: 'app-projects-user-page',
  templateUrl: './projects-user.component.html',
  styleUrls: ['./projects-user.component.scss',
  '../../../../../assets/project-page-layout.scss']
})
export class ProjectsUserComponent implements OnInit {
  search: string = '';
  isLoading: boolean = true;
  isEmpty: boolean = false;
  projects: IProject[] = [];

  constructor(private authService: AuthService,
              private userService: UserService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    let userId = this.authService.currentUser._id!
    this.userService.getProjectsInUser(userId)
      .subscribe(projects => {
        if (projects.length && projects) {
          this.projects = projects
          this.isLoading = false
          this.isEmpty = !projects.length
        } else {
          this.isEmpty = !projects.length
          this.isLoading = false
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }
}
