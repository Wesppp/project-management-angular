import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {GlobalService} from "../../shared/services/global.service";
import {IUser} from "../../shared/interfaces/user";
import {IProject} from "../../shared/interfaces/project";
import {ProjectService} from "../../shared/services/project.service";
import { map } from 'rxjs/operators';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-variable-modal',
  templateUrl: './variable-modal.component.html',
  styleUrls: ['./variable-modal.component.scss']
})
export class VariableModalComponent implements OnInit {
  @Input() public project!: IProject;
  @Output() passEntry: EventEmitter<IProject> = new EventEmitter();
  isAvailableUsersEmpty: boolean = false;
  isUnAvailableUsersEmpty: boolean = false;
  availableUsers: IUser[] = []
  unAvailableUsers: IUser[] = []

  constructor(private userService: UserService,
              private globalService: GlobalService,
              private projectService: ProjectService,
              public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getAvailableUsers()
    this.getUnAvailableUsers()
  }

  getAvailableUsers() {
    this.userService.getUsers()
      .pipe(
        map(el => el.filter(item => !item.role?.includes('admin'))),
        map(el => el.filter(item => !this.project.users?.items.find(k => k.userId === item._id)))
      )
      .subscribe(users => {
        if (users.length && users) {
          this.availableUsers = users
        } else {
          this.isAvailableUsersEmpty = !users.length
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  getUnAvailableUsers() {
    this.projectService.getUsersInProject(this.project._id!)
      .subscribe(users => {
        if (users.length && users) {
          this.unAvailableUsers = users
        } else {
          this.isUnAvailableUsersEmpty = !users.length
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  addUser(user: IUser) {
    this.projectService.addUserToProject(this.project._id!, user)
      .subscribe(project => {
        if (project) {
          this.availableUsers = this.availableUsers.filter(el => el._id !== user._id)
          this.unAvailableUsers.push(user)
          this.passBack(project)
        }
        else this.globalService.customDangerAlert().then()
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  excludeUser(user: IUser) {
    this.projectService.excludeUserFromProject(this.project._id!, user)
      .subscribe(project => {
        if (project) {
          this.unAvailableUsers = this.unAvailableUsers.filter(el => el._id !== user._id)
          this.availableUsers.push(user)
          this.passBack(project)
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  passBack(project: IProject) {
    this.passEntry.emit(project);
  }
}
