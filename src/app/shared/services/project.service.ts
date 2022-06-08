import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, finalize, Observable, of} from "rxjs";
import {IProject} from "../interfaces/project";
import {GlobalService} from "./global.service";
import {IUser} from "../interfaces/user";
import {IReport} from "../interfaces/report";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectUrl: string = environment.projectUrl
  isDisabled: boolean = false

  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.projectUrl).pipe(
      catchError(this.globalService.handleError<IProject[]>("get projects"))
    )
  }

  getProject(id: string): Observable<IProject> {
    const url = `${this.projectUrl}/${id}`
    return this.http.get<IProject>(url).pipe(
      catchError(this.globalService.handleError<IProject>("get project"))
    )
  }

  getUsersInProject(id: string): Observable<IUser[]> {
    const url = `${this.projectUrl}/users/${id}`
    return this.http.get<IUser[]>(url).pipe(
      catchError(this.globalService.handleError<IUser[]>("get users in project"))
    )
  }

  updateProject(project: IProject): Observable<IProject> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    let url = `${this.projectUrl}`
    return this.http.put<IProject>(url, project, this.globalService.httpOptions).pipe(
      catchError(this.globalService.handleError<IProject>("update project")),
      finalize(() => this.isDisabled = false)
    )
  }

  deleteProject(id: string): Observable<IProject> {
    let url = `${this.projectUrl}/${id}`;
    return this.http.delete<IProject>(url, this.globalService.httpOptions).pipe(
      catchError(this.globalService.handleError<IProject>("delete project"))
    )
  }

  addProject(project: IProject): Observable<IProject> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    return this.http.post<IProject>(this.projectUrl, project).pipe(
      catchError(this.globalService.handleError<IProject>("post project")),
      finalize(() => this.isDisabled = false)
    )
  }

  addUserToProject(id: string, user: IUser): Observable<IProject> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true

    let url = `${this.projectUrl}/add-user/${id}`
    return this.http.post<IProject>(url, user).pipe(
      catchError(this.globalService.handleError<IProject>("post project")),
      finalize(() => this.isDisabled = false)
    )
  }
}
