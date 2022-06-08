import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../../shared/interfaces/user";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['../../../../assets/form-layout.scss']
})
export class RegistrationPageComponent implements OnInit {
  registrationForm!: FormGroup
  isRepeatUser: boolean = false
  user: IUser = {name: '', email: '', password: ''};
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.pattern('[A-Za-zА-Яа-яЁё0-9]{1,15}')
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(4)
      ]),
      repeatPassword: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  register(user: IUser) {
    this.userService.postUser(user)
      .subscribe(user => {
        if (user) {
          this.router.navigate(['/login-page'])
          this.isRepeatUser = false
        } else {
          console.log('Something went wrong')
          this.isRepeatUser = true
        }
      }, error => console.log(error.message))
  }

}
