function isOnMobileDevice() {
    let isMobile = navigator.userAgentData.mobile;
    return isMobile;
}

function getSeasonsCompeted() {
    let currentDate = new Date();
    let year2007 = new Date(2007, 1, 7); //Jan 1 2007
    let timeDifference = currentDate.getTime() - year2007.getTime();
    let yearsDifference = timeDifference / 31536000000; //number of milliseconds in a year
    return Math.floor(yearsDifference);
}
