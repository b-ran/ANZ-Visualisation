import {Component, ElementRef, OnInit} from '@angular/core';
import {DataManagerService} from '../../services/data-manager.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-vis',
  template: `
    <svg width="25vw" height="25vh"
         viewBox="0 0 800 800"></svg>`,
  styleUrls: ['./bubble-vis.component.css']
})
export class BubbleVisComponent implements OnInit {

  private svg: any;

  constructor(private container: ElementRef) {
    const df = new DataManagerService((result) => console.log(result));
  }

  ngOnInit() {
  }


  private initSvg() {
    this.svg = d3.select(this.container.nativeElement).select('svg');
  }


}
