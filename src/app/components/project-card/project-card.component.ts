import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProject} from "../../shared/interfaces/project";
import {ProjectService} from "../../shared/services/project.service";
import {GlobalService} from "../../shared/services/global.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {VariableModalComponent} from "../variable-modal/variable-modal.component";
import {ModalComponent} from "../modal/modal.component";
import {AuthService} from "../../pages/auth/auth.service";
import {ModalReportComponent} from "../modal-report/modal-report.component";


@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: IProject
  @Output() broadcastEvent = new EventEmitter<IProject>();
  role!: string

  constructor(private projectService: ProjectService,
              private globalService: GlobalService,
              private modalService: NgbModal,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.role = this.authService.currentUser.role!
  }

  deleteProject($event: any) {
    $event.stopPropagation()
    this.globalService.handleWarningAlert()
      .then(result => {
        if (result.isConfirmed) {
          this.projectService.deleteProject(this.project._id!)
            .subscribe((project) => {
              if (project) {
                this.broadcastEvent.emit(project)
              } else {
                this.globalService.customDangerAlert().then()
              }
              },error => this.globalService.customDangerAlert(error.message).then())
        }
      })
  }

  finishProject(project: IProject, $event: any) {
    $event.stopPropagation()
    project.endDate = new Date().toLocaleDateString()
    this.projectService.updateProject(project)
      .subscribe(project => {
        if (project) {
          this.broadcastEvent.emit(project)
        } else {
          this.globalService.customDangerAlert().then()
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
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
}
