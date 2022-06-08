import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../shared/interfaces/user";
import {ActivatedRoute, Router} from "@angular/router";
import { IProject } from 'src/app/shared/interfaces/project';
import {UserService} from "../../shared/services/user.service";
import {GlobalService} from "../../shared/services/global.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user!: IUser
  @Input() project!: IProject
  @Output() userTransfer = new EventEmitter<IUser>();
  projects!: IProject[]

  constructor(public router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getProjectsInUser(this.user._id!)
  }

  getProjectsInUser(id: string) {
    this.userService.getProjectsInUser(id)
      .subscribe(projects => {
        if (projects.length && projects) {
          this.projects = projects
        }
      },error => this.globalService.customDangerAlert(error.message).then())
  }

  excludeUser(user: IUser, $event: any) {
    $event.stopPropagation()
    this.userService.excludeUser(this.project._id!, user)
      .subscribe(user => {
        if (user) {
          this.userTransfer.emit(user)
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }
}
