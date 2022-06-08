import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, finalize, Observable, of} from "rxjs";
import {IUser} from "../interfaces/user";
import {GlobalService} from "./global.service";
import {IProject} from "../interfaces/project";
import {IReport} from "../interfaces/report";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = environment.userUrl
  isDisabled: boolean = false

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  postUser(user: IUser): Observable<IUser> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    return this.http.post<IUser>(this.userUrl, user, this.globalService.httpOptions).pipe(
      catchError(this.globalService.handleError<IUser>("post user")),
      finalize(() => this.isDisabled = false)
    )
  }

  loginUser(user: IUser): Observable<IUser> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    const url = `${this.userUrl}/login`
    return this.http.post<IUser>(url, user, this.globalService.httpOptions).pipe(
      catchError(this.globalService.handleError<IUser>("login user")),
      finalize(() => this.isDisabled = false)
    )
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.userUrl).pipe(
      catchError(this.globalService.handleError<IUser[]>("get users"))
    )
  }

  getUser(id: string): Observable<IUser> {
    const url = `${this.userUrl}/${id}`
    return this.http.get<IUser>(url).pipe(
      catchError(this.globalService.handleError<IUser>("get user"))
    )
  }

  getProjectsInUser(id: string): Observable<IProject[]> {
    const url = `${this.userUrl}/projects/${id}`
    return this.http.get<IProject[]>(url).pipe(
      catchError(this.globalService.handleError<IProject[]>("get projects in user"))
    )
  }

  getUserReports(id: string): Observable<IReport[]> {
    const url = `${this.userUrl}/reports/${id}`
    return this.http.get<IReport[]>(url).pipe(
      catchError(this.globalService.handleError<IReport[]>("get reports in user"))
    )
  }

  excludeUser(id: string, user: IUser): Observable<IUser> {
    const url = `${this.userUrl}/exclude/${id}`
    return this.http.post<IUser>(url, user).pipe(
      catchError(this.globalService.handleError<IUser>("exclude user"))
    )
  }
}
