import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../../shared/services/project.service";
import {IReport} from "../../../../shared/interfaces/report";

@Component({
  selector: 'app-user-reports-page',
  templateUrl: './user-reports-page.component.html',
  styleUrls: ['./user-reports-page.component.scss']
})
export class UserReportsPageComponent implements OnInit {
  reports: IReport[] = []
  isLoading: boolean = true
  isEmpty: boolean = false

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getReports(params['id'])
    });
  }

  getReports(id: string) {
    this.projectService.getProjectReports(id)
      .subscribe(reports => {
        if (reports.length && reports) {
          this.reports = reports
          this.isLoading = false
          this.isEmpty = false
        } else  {
          this.isLoading = false
          this.isEmpty = true
        }
      }, error => console.log(error.message))
  }
}
