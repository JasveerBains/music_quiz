
export function compareStrings(str1, str2) {
    str1 = str1.replace(/\W/g, '').trim().toLowerCase();
    str2 = str2.replace(/\W/g, '').trim().toLowerCase();

    return str1 == str2
};

export function convertDate(dateString) {
    const [year, month, day] = dateString.split("-");
    const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${mon[parseInt(month)-1]} ${year}`;
}

export function convertTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}