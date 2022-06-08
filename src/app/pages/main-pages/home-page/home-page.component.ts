import { Component, OnInit } from '@angular/core';
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private Location: LocationStrategy) {
    history.pushState(null, '', window.location.href);
    this.Location.onPopState(() => {
      history.pushState(null, '', window.location.href);
    })
  }

  ngOnInit(): void {
  }

}
