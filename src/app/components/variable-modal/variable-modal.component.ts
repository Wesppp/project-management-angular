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
  users!: IUser[]
  @Input() public project!: IProject;
  @Output() passEntry: EventEmitter<IProject> = new EventEmitter();
  isEmpty: boolean = false;

  constructor(private userService: UserService,
              private globalService: GlobalService,
              private projectService: ProjectService,
              public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers()
      .pipe(
        map(el => el.filter(item => !item.role?.includes('admin'))),
        map(el => el.filter(item => !this.project.users?.items.find(k => k.userId === item._id)))
      )
      .subscribe(users => {
        if (users.length && users) {
          this.users = users
        } else {
          this.isEmpty = !users.length
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  addUser(user: IUser) {
    this.projectService.addUserToProject(this.project._id!, user)
      .subscribe(project => {
        if (project) {
          this.users = this.users.filter(el => el._id !== user._id)
          this.isEmpty = !this.users.length
          this.passBack(project)
        }
        else this.globalService.customDangerAlert().then()
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  passBack(project: IProject) {
    this.passEntry.emit(project);
  }
}
