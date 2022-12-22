import { BusList } from "./busList";

const padDate = (text) => {
    let date = text.toString()

    date = PadString(date, 2)
    return date
}

export const PadString = (text, length) => {
    while (text.length < length) {
        text = "0" + text
    }

    return text
}


const PastDate = (time) => {
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

    return pastDate
}

export const GetDate = (time) => {
    var pastDate = PastDate(time)

    var date = padDate(pastDate.getDate());
    var month = pastDate.getMonth() + 1;
    var year = pastDate.getFullYear();

    return `${date}.${month}.${year}`
}

export const GetBusDate = (time) => {
    var pastDate;
    if (time == 2) {
        // give today instead
        pastDate = new Date();
    } else {
        pastDate = PastDate(time)
    } 

    var date = padDate(pastDate.getDate());
    var month = padDate(pastDate.getMonth() + 1);
    var year = pastDate.getFullYear();

    return `${date}${month}${year.toString().slice(-2)}`
}

export const RandomBusNumber = () => {
    let length = BusList.length
    var nums = []
    while(nums.length <= 2){
        var r = Math.floor(Math.random() * length);
        if(nums.indexOf(r) === -1) nums.push(r);
    }

    return([BusList[nums[0]], BusList[nums[1]], BusList[nums[2]]])
}

export const DisplayDate = (time) => {
    if (time == 2) {
        // since forever
        return "forever";
    } else {
        return GetDate(time);
    }

}


