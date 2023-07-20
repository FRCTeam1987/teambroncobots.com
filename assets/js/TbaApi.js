const statboticsUrl = "https://api.statbotics.io/v2/";

let requestCounter = 0;
let timeWaiting = 0; //in seconds
let error = "";

function getYearsParticipated() {
    return [
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
        2023
    ];
}

function getEventsPerYear(year) {
    requestCounter++;
    return $.ajax({
        method: "GET",
        url: statboticsUrl + `team_events/team/1987/year/${year}`,
        headers: {
            "accept": "application/json",

        },
        success: function(response) {
            requestCounter--;
            if (requestCounter === 0) {
                isFinished()
            }
        }
    });
}


function getMatchesPerYear(year) {
    requestCounter++;
    return $.ajax({
        method: "GET",
        url: statboticsUrl + `matches/team/1987/year/${year}`,
        headers: {
            "accept": "application/json",

        },
        success: function(response) {
            requestCounter--;
            if (requestCounter === 0) {
                isFinished()
            }
        }
    });
}

function TeamInfoPerYear(year) {
    requestCounter++;
    return $.ajax({
        method: "GET",
        url: statboticsUrl + `team_year/1987/${year}`,
        headers: {
            "accept": "application/json",

        },
        success: function(response) {
            requestCounter--;
            if (requestCounter === 0) {
                isFinished()
            }
        }
    });
}

async function getRequestCounter() {
    return requestCounter;
}

async function getError() {
    return error;
}

async function isFinished() {
    while (requestCounter > 0) {
        if (requestCounter === -1) {
            error = "StatBotics API appears to be down.";
            return false;
        }
        console.log(`There are ${requestCounter} active call(s). Waiting...`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second
        timeWaiting++; //in seconds
        if (timeWaiting > 15) {
            console.log(`There are ${requestCounter} active call(s). Timed Out.`);
            error = `There are ${requestCounter} active call(s). Timed Out.`;
            return false;
        }
    }
    if (requestCounter === 0) {
        error = "";
        return true;
    }
}
