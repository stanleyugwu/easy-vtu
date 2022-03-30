/**
 * This function will tell you if its time to show `rating` or `announcement` dialog depending on the last time it was shown.
 * You pass it the last time the dialog was shown, it tells you if it's time to re-show the dialog.
 * 
 * **Note:** The default checkmark is `5 days` but you can also pass yours in `milliseconds`.
 */
const isItTime = (lastShownTime:number, checkmark?:number):boolean => {
    const curDate = Date.now(),
    diffInTime = (curDate - lastShownTime),
    isItTime = diffInTime >= (checkmark || 432000000/* 5 days */);

    return isItTime;
}

export default isItTime