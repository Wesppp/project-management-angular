import {Component, Input, OnInit} from '@angular/core';
import {IComment} from "../../shared/interfaces/comment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: IComment

  constructor() { }

  ngOnInit(): void {
  }

}
