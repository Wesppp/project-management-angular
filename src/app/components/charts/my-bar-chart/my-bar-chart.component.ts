import {Component, Input, OnInit} from '@angular/core';
import {ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.scss']
})
export class MyBarChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input() public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  @Input() public barChartData: ChartDataSets[] = [];

  public chartColors: any[] = [
    {
      backgroundColor:["#ffd93e","#ffd93e","#ffd93e","#ffd93e","#ffd93e"]
    }];

  constructor() { }

  ngOnInit() {

  }


}
