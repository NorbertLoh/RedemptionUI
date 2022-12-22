const padDate = (text) => {
    let date = text.toString()
    if (date.length < 2) {
        date = "0" + date
    }

    return date
}

export const GetDate = (time) => {
    var currDate = new Date();
    var pastDate;

    switch (time) {
        case 0:
            pastDate = new Date(currDate.getTime() - 4 * 7 * 24 * 60 * 60 * 1000);
            break;
    
        default:
            pastDate = new Date(currDate.getTime() - 6 * 4 * 7 * 24 * 60 * 60 * 1000);
            break;
    }

    var date = padDate(pastDate.getDate());
    var month = pastDate.getMonth() + 1;
    var year = pastDate.getFullYear();

    return `${date}.${month}.${year}`
}

export const DisplayDate = (time) => {
    if (time == 2) {
        // since forever
        return "forever";
    } else {
        return GetDate(time);
    }

}
