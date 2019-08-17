/* tslint:disable:semicolon */
import {Component, ElementRef, OnInit} from '@angular/core';
import {DataManagerService} from '../../services/data-manager.service';
import * as d3 from 'd3/dist/d3.min.js';


@Component({
  selector: 'app-bubble-vis',
  templateUrl: './bubble-vis.component.html',
  styleUrls: ['./bubble-vis.component.css']
})

export class BubbleVisComponent implements OnInit {

  private svg: any;
  private data: any;
  private decPlaces = 2;

  private ratios = {
    homeRatio: (team) => {
      return {title: 'Home Wins Ratio', ratio: (team.homeWins / team.homeGames).toFixed(this.decPlaces)};
    },
    awayRatio: (team) => {
      return {title: 'Away Wins Ratio', ratio: (team.awayWins / team.awayGames).toFixed(this.decPlaces)};
    },
    winsRatio: (team) => {
      return {title: 'Wins Ratio', ratio: ((team.homeWins + team.awayWins) / (team.homeGames + team.awayGames)).toFixed(this.decPlaces)};
    },
    otherCountryRatio: (team) => {
      return {title: 'Other Country Wins Ratio', ratio: (team.interCountryWins / team.interCountryGames).toFixed(this.decPlaces)};
    }
  };

  private targetRatio = this.ratios.homeRatio;

  constructor(private container: ElementRef) {
    const df = new DataManagerService((result) => this.data = {children: Array.from(result.values())});
  }

  ngOnInit() {
    this.initSvg();
  }

  changeTargetRatio(ratio: (team) => {title: string; ratio: string}) {
    this.targetRatio = ratio;
    this.svg.selectAll('*').remove();
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
        return this.targetRatio(d).ratio;
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
        return this.targetRatio(d.data).title + ' ' + this.targetRatio(d.data).ratio;
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', (d) => {
        return d.r / 7;
      })
      .attr('fill', 'white');

  }


}
