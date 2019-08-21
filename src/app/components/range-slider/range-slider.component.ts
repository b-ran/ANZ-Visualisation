import {Component, OnInit} from '@angular/core';
import {PlayRangeService} from 'play-range';
import {DataManagerService} from '../../services/data-manager.service';
import * as d3 from 'd3/dist/d3.min.js';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent implements OnInit {

  private datesRange: any;
  private leftDate: any;
  private rightDate: any;

  constructor(private rangeSlider: PlayRangeService, private dataManager: DataManagerService) {
    this.recreateSlider(this.dataManager.dateRange().startDate, this.dataManager.dateRange().endDate);
    dataManager.setSliderCallback((startDate, endDate) => {
      this.recreateSlider(startDate, endDate);
    });
  }

  ngOnInit() {
  }

  recreateSlider(startDate: Date, endDate: Date) {
    d3.select('#slider-container').remove();
    this.datesRange = d3.timeDays(startDate, endDate);
    this.rangeSlider.createD3RangeSlider(0, this.datesRange.length - 1, 100);
    this.rangeSlider.onChange((newRange) => {
      this.leftDate = this.datesRange[newRange.begin];
      this.rightDate = this.datesRange[newRange.end];
      this.dataManager.setDateFilter(this.leftDate, this.rightDate);
    });
  }

}
