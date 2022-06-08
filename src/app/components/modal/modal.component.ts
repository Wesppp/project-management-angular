import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IModal} from "../../shared/interfaces/modal";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IProject} from "../../shared/interfaces/project";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() public modalWindowBody!: IModal
  @Output() passEntry: EventEmitter<IProject> = new EventEmitter();
  @Input() public project: IProject = {title: '', description: '', img: '', startDate: ''}
  modalForm!: FormGroup

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.modalForm = new FormGroup({
      title: new FormControl(this.project.title, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      description: new FormControl(this.project.description, [
        Validators.required,
        Validators.maxLength(300)
      ]),
    })
  }
}
