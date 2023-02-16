const tbaUrl = "https://www.thebluealliance.com/api/v3";
const apiKey = jekyll.env.TBA_API_KEY; //FglzQyQwA2VhUenZ1BcfuFGR2xA6lVWMtyvVaOjMTfjJUgz1ozF6j9GO71GlirLV
let requestCounter = 0;
let timeWaiting = 0; //in seconds
let error = "";
function getStatus() {
    requestCounter++;
    return $.ajax({
        method: "GET",
        url: tbaUrl + "/status",
        data: {},
        headers: {
            "accept": "application/json",
            "X-TBA-Auth-Key": apiKey
        },
        success: function(response) {
            requestCounter--;
            if (requestCounter === 0) {
                isFinished()
            }
        },
        error: function () {
            requestCounter = -1;
            isFinished();
        }
    });
}

function getEvents() {
    requestCounter++;
    return $.ajax({
        method: "GET",
        url: tbaUrl + "/team/frc1987/events/simple",
        data: {},
        headers: {
            "accept": "application/json",
            "X-TBA-Auth-Key": apiKey
        },
        success: function(response) {
            requestCounter--;
            if (requestCounter === 0) {
                isFinished()
            }
        }
    });
}

function getYearsParticipated() {
    requestCounter++;
    return $.ajax({
        method: "GET",
        url: tbaUrl + "/team/frc1987/years_participated",
        data: {},
        headers: {
            "accept": "application/json",
            "X-TBA-Auth-Key": apiKey
        },
        success: function(response) {
            requestCounter--;
            if (requestCounter === 0) {
                isFinished()
            }
        }
    });
}

function getEventsPerYear(year) {
    requestCounter++;
    return $.ajax({
        method: "GET",
        url: tbaUrl + "/team/frc1987/events/" + year + "/simple",
        data: {},
        headers: {
            "accept": "application/json",
            "X-TBA-Auth-Key": apiKey
        },
        success: function(response) {
            requestCounter--;
            if (requestCounter === 0) {
                isFinished()
            }
        }
    });
}

function getAwardsPerYear(year) {
    requestCounter++;
    return $.ajax({
        method: "GET",
        url: tbaUrl + "/team/frc1987/awards/" + year,
        data: {},
        headers: {
            "accept": "application/json",
            "X-TBA-Auth-Key": apiKey
        },
        success: function(response) {
            requestCounter--;
            if (requestCounter === 0) {
                isFinished()
            }
        }
    });
}

function years() {
    requestCounter++;
    return $.ajax({
        method: "GET",
        url: tbaUrl + "/team/frc1987/years_participated",
        data: {},
        headers: {
            "accept": "application/json",
            "X-TBA-Auth-Key": apiKey
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
        url: tbaUrl + "/team/frc1987/matches/" + year + "/simple",
        data: {},
        headers: {
            "accept": "application/json",
            "X-TBA-Auth-Key": apiKey
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
            error = "The Blue Alliance Appears to be down.";
            return false;
        }
        console.log("There are ${requestCounter} active call(s). Waiting...");
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

