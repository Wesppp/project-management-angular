import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";
import {catchError, finalize, Observable, of} from "rxjs";
import {IComment} from "../interfaces/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentsUrl: string = environment.commentsUrl
  isDisabled: boolean = false

  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  getByProjectId(projectId: string): Observable<IComment[]> {
    const url = `${this.commentsUrl}/${projectId}`

    return this.http.get<IComment[]>(url).pipe(
      catchError(this.globalService.handleError<IComment[]>("get comments of project"))
    )
  }

  addComment(comment: IComment, projectId: string): Observable<IComment> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true
    const url = `${this.commentsUrl}/add/${projectId}`

    return this.http.post<IComment>(url, comment).pipe(
      catchError(this.globalService.handleError<IComment>("add comment")),
      finalize(() => this.isDisabled = false)
    )
  }
}
