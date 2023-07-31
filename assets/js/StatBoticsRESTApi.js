const statboticsUrl = "https://api.statbotics.io/v2/";

let requestCounter = 0;
let timeWaiting = 0; //in seconds
let error = "";

function getYearsParticipated() {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "GET",
            url: statboticsUrl + `team_events/team/1987`,
            headers: {
                "accept": "application/json",
            },
            success: (response) => {
                // Extract the unique "year" values from the API response
                const uniqueYears = {};
                response.forEach(item => {
                    const year = item.year;
                    if (!uniqueYears[year]) {
                        uniqueYears[year] = true;
                    }
                });

                // Convert the keys of the uniqueYears object into an array of unique "year" values
                const uniqueYearsArray = Object.keys(uniqueYears).map(Number);

                resolve(uniqueYearsArray);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
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
            // Process the response here as needed
            requestCounter--;
            isFinished();
        },
        error: function(error) {
            // Handle errors and decrease the counter even if there's an error
            requestCounter--;
            isFinished();
        },
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
            // Process the response here as needed
            requestCounter--;
            isFinished();
        },
        error: function(error) {
            // Handle errors and decrease the counter even if there's an error
            requestCounter--;
            isFinished();
        },
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
            // Process the response here as needed
            requestCounter--;
            isFinished();
        },
        error: function(error) {
            // Handle errors and decrease the counter even if there's an error
            requestCounter--;
            isFinished();
        },
    });
}

async function isFinished() {
    if (requestCounter === 0) {
        error = "";
        return true;
    }

    return Promise.race([
        new Promise(resolve => setTimeout(resolve, 15000)), // 15 seconds timeout
        new Promise(resolve => {
            const interval = setInterval(() => {
                if (requestCounter === 0) {
                    clearInterval(interval);
                    error = "";
                    resolve(true);
                } else if (requestCounter === -1) {
                    clearInterval(interval);
                    error = "StatBotics API appears to be down.";
                    resolve(false);
                } else {
                    console.log(`There are ${requestCounter} active call(s). Waiting...`);
                }
            }, 500); // Check every 0.5 seconds
        })
    ]);
}

function getRequestCounterRemaining() {
    return requestCounter;
}
