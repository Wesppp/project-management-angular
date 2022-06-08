import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../../shared/interfaces/user";
import {UserService} from "../../../../shared/services/user.service";
import {GlobalService} from "../../../../shared/services/global.service";

@Component({
  selector: 'app-users-admin-page',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss',
  '../../../../../assets/project-page-layout.scss']
})
export class UsersAdminComponent implements OnInit {
  search: string = '';
  isLoading: boolean = true;
  users: IUser[] = []
  isEmpty: boolean = false;
  busyUsers!: number

  constructor(private userService: UserService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.getUsers()
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
          this.isEmpty = !this.users.length;
          this.isLoading = false
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
}
