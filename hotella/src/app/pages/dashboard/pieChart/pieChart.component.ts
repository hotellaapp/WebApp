import {Component, OnInit} from '@angular/core';

import {PieChartService} from './pieChart.service';
import { Observable } from 'rxjs/Observable';
import 'easy-pie-chart/dist/jquery.easypiechart.js';
import { Charts } from 'app/pages/charts/charts.component';

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss']
})
// TODO: move easypiechart to component
export class PieChart{

  static max1=50;
  static max2=20;
  static max3=10;
 
  private charts= [
    {
      color: 'orange',
      description: 'Hóspedes',
      stats: 0,
      icon: 'person',
      percent:0
    }, {
      color:'orange',
      description: 'Visitantes',
      stats: 0,
      icon: 'person',
      percent:0
    }, {
      color: 'orange',
      description: 'Avaliações',
      stats: 0,
      icon: 'face',
      percent:0
    }
  ];
  private _init = false;
private check2=false;

  constructor(private _pieChartService: PieChartService) {
    this._pieChartService.getData1().subscribe(data1 => {
      this.charts[0].stats=data1;
      this.charts[0].percent = (this.charts[0].stats/PieChart.max1)*100;
    
            this._pieChartService.getData2().subscribe(data2 => {
        this.charts[1].stats=data2;
        this.charts[1].percent = (this.charts[1].stats/PieChart.max2)*100;
    
      this._pieChartService.getData3().subscribe(data => {
      this.charts[2].stats=data;
      this.charts[2].percent = (this.charts[2].stats/PieChart.max3)*100;

      this._loadPieCharts();
      this._updatePieCharts(this.charts);
      
  });
  });
  });
  }

  ngAfterViewInit() {
    
    if (!this._init) {
      setInterval(()=>{
      this._pieChartService.getData1().subscribe(data1 => {
        this.charts[0].stats=data1;
        this.charts[0].percent = (this.charts[0].stats/PieChart.max1)*100;
      
              this._pieChartService.getData2().subscribe(data2 => {
          this.charts[1].stats=data2;
          this.charts[1].percent = (this.charts[1].stats/PieChart.max2)*100;
      
        this._pieChartService.getData3().subscribe(data => {
        this.charts[2].stats=data;
        this.charts[2].percent = (this.charts[2].stats/PieChart.max3)*100;

        this._loadPieCharts();
        this._updatePieCharts(this.charts);
    });
    });
    });},10000)
      this._init = true;
      this.check2=true; 
    }
 
  }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round( percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 80,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round'
      });
    });
  }

  private _updatePieCharts(x) {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };
    jQuery('.pie-charts .chart').each(function(index, chart) {
      jQuery(chart).data('easyPieChart').update(x[index].percent);

    });
  }
}
