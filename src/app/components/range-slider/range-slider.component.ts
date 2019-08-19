import {Component, Input, OnInit} from '@angular/core';
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
    const dateRange = dataManager.dateRange();
    this.datesRange = d3.timeDays(dateRange.startDate, dateRange.endDate);
    this.rangeSlider.createD3RangeSlider(0, this.datesRange.length - 1, 100);
    this.rangeSlider.onChange((newRange) => {
      this.leftDate = this.datesRange[newRange.begin];
      this.rightDate = this.datesRange[newRange.end];
      dataManager.setDateFilter(this.leftDate, this.rightDate);
    });
  }

  ngOnInit() {
  }

}
