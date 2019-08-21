import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataManagerService} from '../../services/data-manager.service';

@Component({
  selector: 'app-season-filter',
  templateUrl: './season-filter.component.html',
  styleUrls: ['./season-filter.component.css']
})
export class SeasonFilterComponent implements OnInit {
  selected = this.dataManager.getSeasonInfo()[0];

  @Output() dateSelected = new EventEmitter();

  constructor(private dataManager: DataManagerService) {
  }

  ngOnInit() {
  }

  changeSeason(season: any) {
    this.dataManager.setDateFilter(new Date(season.startDate), new Date(season.endDate));
    this.dataManager.updateSliderCallback(new Date(season.sliderStart), new Date(season.endDate));
  }
}
