import {Component, ElementRef, OnInit} from '@angular/core';
import {DataManagerService} from '../../services/data-manager.service';
import * as d3 from 'd3/dist/d3.min.js';
import { $ } from 'protractor';

@Component({
  selector: 'app-bubble-vis',
  template: `
    <svg width="25vw" height="25vh"
         viewBox="0 0 800 800"></svg>`,
  styleUrls: ['./bubble-vis.component.css']
})
export class BubbleVisComponent implements OnInit {

  private svg: any;
  private data: any;
  private ratioHome = function (d) { return (d.homeWins / d.homeGames)};

  constructor(private container: ElementRef) {
    const df = new DataManagerService((result) => this.data = result);
  }

  ngOnInit() {
    this.initSvg()
  }


  private initSvg() {
    this.svg = d3.select(this.container.nativeElement).select('svg');
    this.data.forEach(element => {
      this.svg.append("teams")
              .attr("teamName", element.teamName)
              .attr("homeWins", element.homeWins)
              .attr("homeGames", element.homeGames)
              .attr("awayWins", element.awayWins)
              .attr("awayGames", element.awayGames);
    });
    
    var diameter = 600;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    

    var bubble = d3.pack(this.data)
                    .size([diameter, diameter])
                    .padding(1.5);
    


    var nodes = d3.hierarchy(this.data)
            .sum(function (d) { return (d.homeWins / d.homeGames)});
  
    
    var node = this.svg.selectAll("teams")
                  .append("g")
                  .attr("class", "node")
                  .attr("transform", function(d){
                    return "translate(" + d.x + "," + d.y + ")"
                  });

    node.append("title")
        .text(function(d){
          return d.teamName +  ":" + (d.homeWins / d.homeGames);
        });

    node.append("circle")
        .attr("r", function(d){
          d.r;
        })
        .style("fill", function(d,i){
          return color(i);
        });
  


        node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.teamName;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return (d.homeWins / d.homeGames);
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");
    
  }


  private displayData(){
    
    }


}
