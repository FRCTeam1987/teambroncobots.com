const statboticsUrl = "https://api.statbotics.io/v3/";

let requestCounter = 0;
let timeWaiting = 0; //in seconds
let error = "";

// Inside StatBoticsRESTApi.js
console.log("StatBoticsRESTApi.js loaded");

function getOrdinalSuffix(number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return "th";
    }

    return suffixes[lastDigit] || "th";
}

function getYearsParticipated() {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "GET",
            url: statboticsUrl + `team_years?team=1987`,
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
        url: statboticsUrl + `team_events?team=1987&year=${year}`,
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
        url: statboticsUrl + `team_matches?team=1987&year=${year}`,
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

async function pointsPerMatchPerYear(year) {
    let matchesPerYear = await getMatchesPerYear(year);

    return matchesPerYear.map(match => {
        const hasDriveModes = match.epa.breakdown.auto_points !== undefined &&
            match.epa.breakdown.teleop_points !== undefined &&
            match.epa.breakdown.endgame_points !== undefined;

        if (hasDriveModes) {
            return {
                key: match.match,
                time: match.time,
                auto: match.epa.breakdown.auto_points,
                teleop: match.epa.breakdown.teleop_points,
                endgame: match.epa.breakdown.endgame_points,
                total: match.epa.breakdown.total_points,
                alliance: match.alliance
            };
        } else {
            return {
                key: match.match,
                time: match.time,
                total: match.epa.breakdown.total_points,
                alliance: match.alliance
            };
        }
    });
}


async function createChart(year) {
    const data = await pointsPerMatchPerYear(year);
    if (year === 2021 || data.length === 0) {
        $("#chart-wrapper").html("No Data Available");
        return;
    }
    data.sort((a, b) => a.time - b.time);

    const ctx = document.getElementById('myChart' + year).getContext('2d');

    const redColor = '#FF0000';
    const blueColor = '#0000FF';

    // Check if data contains auto/teleop/endgame breakdowns
    const hasBreakdown = data.some(match => match.auto !== undefined && match.teleop !== undefined && match.endgame !== undefined);

    const chartData = {
        labels: data.map(match => match.key),
        datasets: []
    };

    if (hasBreakdown) {
        chartData.datasets.push(
            {
                label: 'Auto',
                data: data.map(match => match.alliance === 'red' ? match.auto : null),
                backgroundColor: '#FF6666',
                stack: 'composite',
            },
            {
                label: 'Teleop',
                data: data.map(match => match.alliance === 'red' ? match.teleop : null),
                backgroundColor: '#FF0000',
                stack: 'composite',
            },
            {
                label: 'Endgame',
                data: data.map(match => match.alliance === 'red' ? match.endgame : null),
                backgroundColor: '#CC0000',
                stack: 'composite',
            },
            {
                label: 'Auto',
                data: data.map(match => match.alliance === 'blue' ? match.auto : null),
                backgroundColor: '#6666FF',
                stack: 'composite',
            },
            {
                label: 'Teleop',
                data: data.map(match => match.alliance === 'blue' ? match.teleop : null),
                backgroundColor: '#0000FF',
                stack: 'composite',
            },
            {
                label: 'Endgame',
                data: data.map(match => match.alliance === 'blue' ? match.endgame : null),
                backgroundColor: '#0000CC',
                stack: 'composite',
            }
        );
    } else {
        // Use only total points for early years
        chartData.datasets.push(
            {
                label: 'Total (Red)',
                data: data.map(match => match.alliance === 'red' ? match.total : null),
                backgroundColor: '#FF4444',
                stack: 'total',
            },
            {
                label: 'Total (Blue)',
                data: data.map(match => match.alliance === 'blue' ? match.total : null),
                backgroundColor: '#4444FF',
                stack: 'total',
            }
        );
    }

    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    stacked: true,
                    ticks: {
                        display: false
                    }
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
                    }
                }
            }
        }
    });
}


async function eventsPerYear(year) {
    let eventsPerYear = JSON.parse(sessionStorage.getItem("eventsPerYear" + year));
    if (eventsPerYear === null) {
        eventsPerYear = await getEventsPerYear(year);
        sessionStorage.setItem("eventsPerYear" + year, JSON.stringify(eventsPerYear));
    }

    if (year === 2021) {
        $(("#eventsPerYear" + year + ", #eventsPerYearCard" + year)).html("No Data Available");
    } else if (Array.isArray(eventsPerYear) && eventsPerYear.length > 0) {
        $(("#eventsPerYear" + year + ", #eventsPerYearCard" + year)).html(
            eventsPerYear.map(ev => {
                return ev.event_name + "<br/>";
            })
        );
    } else {
        $(("#eventsPerYear" + year + ", #eventsPerYearCard" + year)).html("No Events Available");
    }
}

async function scoreData(year, isRobotsPage) {
    let scoreData = JSON.parse(sessionStorage.getItem("scoreData" + year));
    if (scoreData === null) {
        scoreData = await TeamInfoPerYear(year);
        sessionStorage.setItem("scoreData" + year, JSON.stringify(scoreData));
    }

    if (year === 2021 || !scoreData.epa) {
        $("#scoreData" + year).html("No Data Available");
        return;
    }

    const {
        record: { wins, losses, winrate },
        epa: { unitless: epa_end, ranks },
        name,
        state,
    } = scoreData;

    const {
        total: { rank: total_epa_rank, percentile: total_epa_percentile, team_count: total_team_count },
        country: { rank: country_epa_rank, team_count: country_team_count } = {},
        state: { rank: state_epa_rank, team_count: state_team_count } = {},
    } = ranks || {};

    const percentileFormatted = (total_epa_percentile * 100).toFixed(0);
    const ordinalSuffix = getOrdinalSuffix(Math.floor(total_epa_percentile * 100));

    let html = "";
    if (isRobotsPage) {
        html =
            '<div style="font-size: 1.5em; display: flex; flex-wrap: wrap;">' +
            '<div style="flex: 1; min-width: 250px; margin-right: 1rem;">' +
            wins + ' wins - ' + losses + ' losses<br/>' +
            epa_end + ' EPA<br/>' +
            (winrate * 100).toFixed(2) + '% Win Rate<br/>' +
            percentileFormatted + ordinalSuffix + " percentile<br/><br/>" +
            '</div>' +
            '<div style="display: flex; flex-wrap: wrap;">' +
            '<div style="font-size: 1em; margin-right: 2.5rem; margin-bottom: 1rem; width: 7em; height: 6em; background-color: #990202; border-radius: 24%; color: #F2F2F2; display: flex; justify-content: center; align-items: center;">Ranked<br/>' + state_epa_rank + '/' + state_team_count + '<br/>in Missouri</div>' +
            '<div style="font-size: 1em; margin-right: 2.5rem; margin-bottom: 1rem; width: 7em; height: 6em; background-color: #830506; border-radius: 24%; color: #F2F2F2; display: flex; justify-content: center; align-items: center;">Ranked<br/>' + country_epa_rank + '/' + country_team_count + '<br/>in the USA</div>' +
            '<div style="font-size: 1em; width: 7em; height: 6em; background-color: #990202; border-radius: 24%; color: #F2F2F2; display: flex; justify-content: center; align-items: center;">Ranked<br/>' + total_epa_rank + '/' + total_team_count + '<br/>in the world</div>' +
            '</div>' +
            '</div>';
    } else {
        html =
            '<div style="font-size: 1.5em;">' +
            `${wins} wins - ${losses} losses<br/>` +
            `${epa_end.toFixed(2)} EPA<br/>` +
            `${(winrate * 100).toFixed(2)}% Win Rate<br/>` +
            `${percentileFormatted}${ordinalSuffix} percentile<br/><br/>` +
            '</div>' +
            '<div style="display: flex; flex-wrap: wrap; flex-direction: row; justify-content: space-around; align-items: center;">' +
            (state
                ? `<div class="RankButton">Ranked <br/> ${state_epa_rank}/${state_team_count} <br/> in ${state} <br/></div>`
                : '') +
            `<div class="RankButton">Ranked <br/> ${country_epa_rank}/${country_team_count} <br/> in the USA </div>` +
            `<div class="RankButton">Ranked <br/> ${total_epa_rank}/${total_team_count} <br/> in the world </div>` +
            '</div>';
    }


    $("#scoreData" + year).html(html);
}
