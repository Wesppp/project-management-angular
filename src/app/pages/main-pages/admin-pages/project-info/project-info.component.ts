import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../../shared/services/global.service";
import {ProjectService} from "../../../../shared/services/project.service";
import {IProject} from "../../../../shared/interfaces/project";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../../../shared/services/comment.service";
import {IComment} from "../../../../shared/interfaces/comment";
import {Location} from "@angular/common";

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
  comments!: IComment[]
  project!: IProject
  isProjectLoading: boolean = true;
  role!: string
  isCommentsLoading: boolean = true
  commentsForm!: FormGroup

  constructor(private globalService: GlobalService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private commentService: CommentService,
              private _location: Location) { }

  ngOnInit(): void {
    this.role = this.authService.currentUser.role!
    this.getAll()

    this.commentsForm = new FormGroup({
      content: new FormControl(null, [
        Validators.maxLength(500),
        Validators.required
      ])
    })
  }

  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe(project => {
        if (project) {
          this.project = project
          this.isProjectLoading = false
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  getComments(id: string) {
    this.commentService.getByProjectId(id)
      .subscribe(comments => {
        if (comments.length && comments) {
          this.comments = comments
          this.isCommentsLoading = false
        } else {
          this.comments = []
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  getAll() {
    this.route.params.subscribe((params: Params) => {
      this.getProject(params['id'])
      this.getComments(params['id'])
    }, error => this.globalService.customDangerAlert(error.message).then())
  }

  addComment(content: string) {
    if(this.commentsForm.invalid) {return}

    this.commentService.addComment({content} as IComment, this.project._id!)
      .subscribe(comment => {
        if (comment) {
          this.comments.unshift(comment)
          this.isCommentsLoading = false
        }
      }, error => this.globalService.customDangerAlert(error.message).then())
  }

  goBack() {
    this._location.back()
  }
}
