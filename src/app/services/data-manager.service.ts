import {Injectable} from '@angular/core';
import data from '../../assets/clean-data/anz-championship-cleaned-data.json';
import teamInfo from '../../assets/clean-data/team-venue-country.json';
import seasonInfo from '../../assets/clean-data/season-date-ranges.json';

/**
 * accumulates values from cleaned data json into results map where team-name is the key and have the elements
 * teamName, homeName, homeWins, homeGames, awayWins, awayGames, interCountryWins, interCountryGames
 */
function accumulateValues(input) {
  const result = new Map();
  input.forEach((element) => {

    const outcome = findOutcome(element);
    const homeResult = outcome.homeResult;
    const awayResult = outcome.awayResult;

    const isInterCountry = checkInterCountry(element);

    if (result.has(homeResult.team)) {
      const vals = result.get(homeResult.team);
      vals.homeWins += homeResult.outcome;
      vals.homeGames += 1;
      vals.interCountryGames += isInterCountry ? homeResult.outcome : 0;
      vals.interCountryGames += isInterCountry ? 1 : 0;
      result.set(homeResult.team, vals);
    } else {
      result.set(homeResult.team,
        {
          teamName: homeResult.team, homeWins: homeResult.outcome, homeGames: 1, awayWins: 0, awayGames: 0,
          interCountryWins: isInterCountry ? homeResult.outcome : 0, interCountryGames: isInterCountry ? 1 : 0
        });
    }
    if (result.has(awayResult.team)) {
      const vals = result.get(awayResult.team);
      vals.awayWins += awayResult.outcome;
      vals.awayGames += 1;
      vals.interCountryWins += isInterCountry ? awayResult.outcome : 0;
      vals.interCountryGames += isInterCountry ? 1 : 0;
      result.set(awayResult.team, vals);
    } else {
      result.set(awayResult.team,
        {
          teamName: awayResult.team, homeWins: 0, homeGames: 0, awayWins: awayResult.outcome, awayGames: 1,
          interCountryWins: isInterCountry ? awayResult.outcome : 0, interCountryGames: isInterCountry ? 1 : 0
        });
    }
  });
  return result;
}

function checkInterCountry(element) {
  return (teamInfo.find((team) => team.teamName === element['Home Team']).country
    !== teamInfo.find((team) => team.teamName === element['Away Team']).country);
}

function findOutcome(element) {
  const homeResult = {team: element['Home Team'], outcome: 0};
  const awayResult = {team: element['Away Team'], outcome: 0};
  if (element['Home Score'] > element['Away Score']) {
    homeResult.outcome = 1;
    awayResult.outcome = 0;
  } else if (element['Away Score'] > element['Home Score']) {
    homeResult.outcome = 0;
    awayResult.outcome = 1;
  }
  return {homeResult, awayResult};
}


@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private teams = [];
  private startDate: Date = new Date(data[0].Date);
  private endDate: Date = new Date(data[data.length - 1].Date);
  private callbacks = [];
  private sliderCallback: any;

  private decPlaces = 2;

  constructor() {
  }

  dateRange() {
    return {
      startDate: new Date(data[0].Date),
      endDate: new Date(data[data.length - 1].Date)
    };
  }

  getTeamInfo() {
    return teamInfo;
  }

  getSeasonInfo() {
    return seasonInfo;
  }

  roundRatio(n: number) {
    if (isNaN(n)) {
      return 1.00;
    }
    return n.toFixed(this.decPlaces);
  }

  teamColor(teamName: string) {
    return teamInfo.find((team) => team.teamName === teamName).color;
  }

  addCallback(callback) {
    this.callbacks.push(callback);
    this.updateCallbacks();
  }

  updateCallbacks() {
    if (this.callbacks.length === 0) {
      return;
    }
    for (const callback of this.callbacks) {
      callback(accumulateValues(this.filterData()));
    }
  }

  setSliderCallback(sliderCallback) {
    this.sliderCallback = sliderCallback;
  }

  updateSliderCallback(startDate: Date, endDate: Date) {
    this.sliderCallback(startDate, endDate);
  }

  setDateFilter(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.updateCallbacks();
  }

  filterTeam(team: any) {
    this.teams.push(team);
    this.updateCallbacks();
  }

  filterData() {
    const filtered = [];
    data.forEach((element) => {
      let dateOK = false;
      if (this.startDate !== undefined && this.endDate !== undefined) {
        dateOK = (new Date(element.Date) >= this.startDate && new Date(element.Date) <= this.endDate);
      } else {
        dateOK = true;
      }
      if (dateOK) {
        filtered.push(element);
      }
    });
    return filtered;
  }
}
