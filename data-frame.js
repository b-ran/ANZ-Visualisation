/* Author: Andrew Hay, 300281312 */

const data = require('./clean-data/anz-championship-cleaned-data.json');

const teamInfo = () => {
  const result = new Map();
  data.forEach((element) => {
    if (!result.has(element['Home Team'])) {
      result.set(element['Home Team'], element.Venue);
    }
  });
  return result;
};

function accumulateValues(input) {
  const result = new Map();
  input.forEach((element) => {
    const homeResult = { team: element['Home Team'], outcome: 0 };
    const awayResult = { team: element['Away Team'], outcome: 0 };
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
      result.set(homeResult.team, vals);
    } else {
      result.set(homeResult.team,
        {
          homeWins: homeResult.outcome, homeGames: 1, awayWins: 0, awayGames: 0,
        });
    }
    if (result.has(awayResult.team)) {
      const vals = result.get(awayResult.team);
      vals.awayWins += awayResult.outcome;
      vals.awayGames += 1;
      result.set(awayResult.team, vals);
    } else {
      result.set(awayResult.team,
        {
          homeWins: 0, homeGames: 0, awayWins: awayResult.outcome, awayGames: 1,
        });
    }
  });
  return result;
}

class DataFrame {

  constructor(callback) {
    this.callback = callback;
    this.callback(accumulateValues(data));
  }

  setFilters(teams, dateStart, dateEnd) {
    this.teams = teams; // expected array
    // this.country = country;
    this.dateStart = dateStart; // expected Date object
    this.dateEnd = dateEnd; // expected Date object
    this.callback(accumulateValues(this.filterData()));
  }

  filterData() {
    const filtered = [];
    data.forEach((element) => {
      let dateOK = false;
      if (this.dateStart !== undefined && this.dateEnd !== undefined) {
        dateOK = (element.Date >= this.dateStart && element.Date <= this.dateEnd);
      } else {
        dateOK = true;
      }
      let teamsOK = false;
      if (this.teams !== undefined) {
        teamsOK = (this.teams.includes(element['Home Team'])
        && this.teams.includes(element['Away Team']));
      } else {
        teamsOK = true;
      }
      if (dateOK && teamsOK) {
        filtered.push(element);
      }
    });
    return filtered;
  }
}

const df = new DataFrame((result) => console.log(result));
console.log(teamInfo());