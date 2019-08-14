# Possible structures for JSON objects

I am not a master at JSON and have never used it extensively so feel free to change these

Will need to split the data into json of all teams and data on those teams i.e.

```
[
    {
        "CentralPulse": [{
            "OverallWinLossRatio": 0.7,
            "WinLossAwayFromHome": 0.5,
            "WinLossAtHome": 0.9,
            "WinLossAgainstAus": 0.4,
            "HomeVenue": "TSB Bank Arena"
        }],
        "MelbournVixens": [

        ]
    }
]
```

We may also need a json object for the rankings of teams for each season.

```
[
    {
        "Season1":
                [
                    {
                        "DateStart": """,
                        "DateEnd": """,
                        "Winner": "Central Pulse",
                        "RunnerUp": "Melbourne Vixens"
                    }
                ],
        "Season2": 
                [
                    {
                        "Winner": "CanterburyTactix",
                    }
                ]
    }
]
```