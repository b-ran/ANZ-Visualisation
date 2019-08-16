/* tslint:disable:semicolon */
import {Component, ElementRef, OnInit} from '@angular/core';
import {DataManagerService} from '../../services/data-manager.service';
import * as d3 from 'd3/dist/d3.min.js';

@Component({
  selector: 'app-bubble-vis',
  template: `
    <svg viewBox="0 0 800 800"></svg>`,
  styleUrls: ['./bubble-vis.component.css']
})
export class BubbleVisComponent implements OnInit {

  private svg: any;
  private data: any;
  private ratioHome = (d) => {
    return (d.homeWins / d.homeGames);
  };

  constructor(private container: ElementRef) {
    const df = new DataManagerService((result) => this.data = {children: Array.from(result.values())});
    console.log(this.data);
  }

  ngOnInit() {
    this.initSvg();
  }

  private initSvg() {
    const diameter = 300;
    const bubble = d3.pack(this.data)
      .size([diameter, diameter])
      .padding(1.5);
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    this.svg = d3.select(this.container.nativeElement).select('svg').attr('class', 'bubble');

    const nodes = d3.hierarchy(this.data)
      .sum((d) => {
        return d.homeWins;
      });

    const node = this.svg.selectAll('.node')
      .data(bubble(nodes).descendants())
      .enter()
      .filter((d) => {
        return !d.children;
      })
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => {
        return `translate(${d.x}, ${d.y})`;
      });

    node.append('circle')
      .attr('r', (d) => {
        return d.r;
      })
      .style('fill', (d, i) => {
        return color(i);
      });

    node.append('text')
      .attr('dy', '.2em')
      .style('text-anchor', 'middle')
      .text((d) => {
        return d.data.teamName;
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', (d) => {
        return d.r / 7;
      })
      .attr('fill', 'white');

    node.append('text')
      .attr('dy', '1.3em')
      .style('text-anchor', 'middle')
      .text((d) => {
        return 'Home Wins: ' + d.data.homeWins;
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', (d) => {
        return d.r / 7;
      })
      .attr('fill', 'white');

  }


}
