import { Component, OnInit } from '@angular/core';
import {RangeSliderService} from 'play-range';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent implements OnInit {

  constructor(private rangeSlider: RangeSliderService) {
    this.rangeSlider.createD3RangeSlider(0, 100);
    this.rangeSlider.onChange((newRange) => {
      console.log(newRange.begin + ' ' + newRange.end);
    });
  }

  ngOnInit() {
  }

}
