import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProject} from "../../shared/interfaces/project";
import {ProjectService} from "../../shared/services/project.service";
import {GlobalService} from "../../shared/services/global.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {VariableModalComponent} from "../variable-modal/variable-modal.component";
import {ModalComponent} from "../modal/modal.component";
import {AuthService} from "../../pages/auth/auth.service";
import {ModalReportComponent} from "../modal-report/modal-report.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: IProject
  @Output() deleteProjectEvent = new EventEmitter<IProject>();
  @Output() finishProjectEvent = new EventEmitter<IProject>();
  role!: string

  constructor(private projectService: ProjectService,
              private globalService: GlobalService,
              private modalService: NgbModal,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.role = this.authService.currentUser.role!
  }

  deleteProject($event: any) {
    $event.stopPropagation()
    this.globalService.handleWarningAlert('You will not be able to recover this!')
      .then(result => {
        if (result.isConfirmed) {
          this.projectService.deleteProject(this.project._id!)
            .subscribe((project) => {
              if (project) {
                this.deleteProjectEvent.emit(project)
              } else {
                this.globalService.customDangerAlert().then()
              }
              },error => this.globalService.customDangerAlert(error.message).then())
        }
      })
  }

  finishProject(project: IProject, $event: any) {
    $event.stopPropagation()
    this.globalService.handleWarningAlert('Are you sure you want to finish the project?')
      .then(result => {
        if (result.isConfirmed) {
          project.endDate = new Date().toLocaleDateString()
          project.status = 1
          this.projectService.finishProject(project)
            .subscribe(project => {
              if (project) {
                this.finishProjectEvent.emit(project)
              } else {
                this.globalService.customDangerAlert().then()
              }
            }, error => this.globalService.customDangerAlert(error.message).then())
        }
      })
  }

  editProject = (data: object, project: IProject) => {
    project = Object.assign(project, data)
    this.projectService.updateProject(project!)
      .subscribe(project => {
        if (project) {}
        else this.globalService.customDangerAlert().then()
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  openUsersModal(project: IProject, $event: any) {
    $event.stopPropagation()
    const modalRef = this.modalService.open(VariableModalComponent);
    modalRef.componentInstance.project = project;
    modalRef.componentInstance.passEntry.subscribe((project: IProject) => {
      this.project = project
    })
  }

  openEditModal(project: IProject, $event:any) {
    $event.stopPropagation()
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalWindowBody = {
      title: 'Edit project',
      action: 'EDIT',
      modalFunction: this.editProject
    };
    modalRef.componentInstance.project = project
  }

  openReportModal(project: IProject, $event: any) {
    $event.stopPropagation()
    const modalRef = this.modalService.open(ModalReportComponent);
    modalRef.componentInstance.project = project
  }

  viewReports(project: IProject, $event: MouseEvent) {
    $event.stopPropagation()
    this.router.navigate(['/user-project-reports', project._id])
  }
}
