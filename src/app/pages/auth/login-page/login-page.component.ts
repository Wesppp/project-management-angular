import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../../shared/interfaces/user";
import {UserService} from "../../../shared/services/user.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../../../../assets/form-layout.scss']
})
export class LoginPageComponent implements OnInit {
  user: IUser = {email: '',password: ''};
  loginForm!: FormGroup
  isExistUser: boolean = false

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }


  login(user: IUser) {
    this.userService.loginUser(user)
      .subscribe(res => {
        if (res) {
          this.isExistUser = false
          this.authService.login(res)
        } else {
          console.log('Something went wrong')
          this.isExistUser = true
        }
      }, error => console.log(error.message))
  }
}
