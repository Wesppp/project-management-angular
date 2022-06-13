import {Component, Input, OnInit} from '@angular/core';
import {IProject} from "../../shared/interfaces/project";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReportService} from "../../shared/services/report.service";
import {IReport} from "../../shared/interfaces/report";
import {GlobalService} from "../../shared/services/global.service";

@Component({
  selector: 'app-modal-report',
  templateUrl: './modal-report.component.html',
  styleUrls: ['./modal-report.component.scss']
})
export class ModalReportComponent implements OnInit {
  @Input() public project!: IProject
  reportForm!: FormGroup

  constructor(public activeModal: NgbActiveModal,
              private reportService: ReportService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.reportForm = new FormGroup({
      report: new FormControl(null, [
        Validators.required,
        Validators.maxLength(300)
      ]),
    })
  }

  addReport(reportFormData: any) {
    this.reportService.addReport({report: reportFormData.report} as IReport, this.project._id!)
      .subscribe(report => {
        if (report) {
          this.globalService.customNotification('Your report has been sent').then()
        } else {
          this.globalService.customDangerAlert().then()
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }
}
