import { Component, OnInit } from '@angular/core';
import {DataManagerService} from '../../services/data-manager.service';

@Component({
  selector: 'app-bubble-vis',
  templateUrl: './bubble-vis.component.html',
  styleUrls: ['./bubble-vis.component.css']
})
export class BubbleVisComponent implements OnInit {

  constructor() {
    const df = new DataManagerService((result) => console.log(result));
  }

  ngOnInit() {
  }

}
