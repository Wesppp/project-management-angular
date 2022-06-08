import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../../../shared/services/project.service";
import {IProject} from "../../../../shared/interfaces/project";
import {GlobalService} from "../../../../shared/services/global.service";
import {ModalComponent} from "../../../../components/modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-projects-admin-page',
  templateUrl: './projects-admin.component.html',
  styleUrls: ['./projects-admin.component.scss',
    '../../../../../assets/project-page-layout.scss']
})
export class ProjectsAdminComponent implements OnInit {
  projects: IProject[] = []
  isLoading: boolean = true
  search!: string;
  isEmpty: boolean = false

  constructor(private projectService: ProjectService,
              private globalService: GlobalService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(projects => {
        if (projects.length && projects) {
          this.projects = projects.filter(el => !el.endDate)
          this.isLoading = false
          this.isEmpty = !this.projects.length;
        } else {
          this.isEmpty = !this.projects.length;
          this.isLoading = false
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  addProject = (projectData: object) => {
    this.projectService.addProject(projectData as IProject)
      .subscribe(project => {
        if (project) {
          this.projects.push(project)
          this.isEmpty = !this.projects.length;
          this.isLoading = false
        } else {
          this.globalService.customDangerAlert().then()
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  changeProjects(project: IProject) {
    this.projects = this.projects.filter(el => el._id !== project._id)
    this.isEmpty = !this.projects.length;
  }

  openAddModal(project?: IProject) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalWindowBody = {
      title: 'Add project',
      action: 'ADD',
      modalFunction: this.addProject
    }
  }
}
