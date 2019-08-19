import {Injectable} from '@angular/core';


// @ts-ignore
import data from '../../assets/clean-data/anz-championship-cleaned-data.json';
import teamInfo from '../../assets/clean-data/team-venue-country.json';

function accumulateValues(input) {
  const result = new Map();
  input.forEach((element) => {
    const homeResult = {team: element['Home Team'], outcome: 0};
    const awayResult = {team: element['Away Team'], outcome: 0};

    const isInterCountry = (teamInfo.find((team) => team.teamName === element['Home Team']).country
      !== teamInfo.find((team) => team.teamName === element['Away Team']).country);

    if (element['Home Score'] > element['Away Score']) {
      homeResult.outcome = 1;
      awayResult.outcome = 0;
    } else if (element['Away Score'] > element['Home Score']) {
      homeResult.outcome = 0;
      awayResult.outcome = 1;
    } // else it is a draw - need to handle?

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

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor() {
  }

  private teams = [];
  private dateEnd: Date;
  private dateStart: Date;
  private callback: any;

  dateRange() {
    return {
      startDate: new Date(data[0].Date),
      endDate: new Date(data[data.length - 1].Date)
    };
  }

  getTeamInfo() {
    return teamInfo;
  }

  teamColor(teamName: string) {
    return teamInfo.find((team) => team.teamName === teamName).color;
  }

  setCallback(callback) {
    this.callback = callback;
    this.callback(accumulateValues(data));
  }

  updateCallback() {
    if (this.callback === undefined) {
      return;
    }
    this.callback(accumulateValues(this.filterData()));
  }

  setFilters(teams: any[], dateStart: Date, dateEnd: Date) {
    this.teams = teams;
    // this.country = country;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.updateCallback();
  }

  setDateFilter(dateStart: Date, dateEnd: Date) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.updateCallback();
  }

  filterTeam(team: any) {
    this.teams.push(team);
    this.updateCallback();
  }

  filterData() {
    const filtered = [];
    data.forEach((element) => {
      let dateOK = false;
      if (this.dateStart !== undefined && this.dateEnd !== undefined) {
        dateOK = (new Date(element.Date) >= this.dateStart && new Date(element.Date) <= this.dateEnd);
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
