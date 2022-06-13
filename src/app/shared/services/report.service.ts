import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";
import {catchError, finalize, Observable, of} from "rxjs";
import {IReport} from "../interfaces/report";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reportsUrl: string = environment.reportsUrl
  isDisabled: boolean = false

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  getReports(): Observable<IReport[]> {
    return this.http.get<IReport[]>(this.reportsUrl).pipe(
      catchError(this.globalService.handleError<IReport[]>("get reports"))
    )
  }

  addReport(report: IReport, projectId: string): Observable<IReport> {
    if (this.isDisabled) {return of()}
    this.isDisabled = true
    const url = `${this.reportsUrl}/add/${projectId}`

    return this.http.post<IReport>(url, report).pipe(
      catchError(this.globalService.handleError<IReport>("add report")),
      finalize(() => this.isDisabled = false)
    )
  }
}
