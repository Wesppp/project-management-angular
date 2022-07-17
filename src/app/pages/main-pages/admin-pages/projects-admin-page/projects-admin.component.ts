import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../../../shared/services/project.service";
import {IProject} from "../../../../shared/interfaces/project";
import {GlobalService} from "../../../../shared/services/global.service";
import {ModalComponent} from "../../../../components/modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectStatus} from "../../../../shared/enums/project-status";

@Component({
  selector: 'app-projects-admin-page',
  templateUrl: './projects-admin.component.html',
  styleUrls: ['./projects-admin.component.scss',
    '../../../../../assets/project-page-layout.scss']
})
export class ProjectsAdminComponent implements OnInit {
  projects: IProject[] = []
  displayProjects: IProject[] = []
  projectsStatus: ProjectStatus = 0
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
          this.projects = projects
          this.isLoading = false
          this.switchProjects(0)
        } else {
          this.isEmpty = !projects.length;
          this.isLoading = false
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  addProject = (projectData: object) => {
    this.projectService.addProject(projectData as IProject)
      .subscribe(project => {
        if (project) {
          this.projects.push(project)
          this.switchProjects(0)
          this.isEmpty = !this.projects.length;
          this.isLoading = false
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  openAddModal(project?: IProject) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalWindowBody = {
      title: 'Add project',
      action: 'ADD',
      modalFunction: this.addProject
    }
  }

  switchProjects(status: number) {
    this.displayProjects = this.projects.filter(project => project.status === status)
    this.isEmpty = !this.displayProjects.length;
    this.projectsStatus = status
  }

  deleteProject(project: IProject) {
    this.projects = this.projects.filter(p => p._id !== project._id)
    this.switchProjects(0)
  }

  finishProject(project: IProject) {
    this.projects = this.projects.filter(p => p._id === project._id ? project : p)
    this.switchProjects(0)
  }
}
