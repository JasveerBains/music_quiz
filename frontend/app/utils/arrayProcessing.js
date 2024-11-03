
export function shuffleArray(array) {
    var arrayCopy = [...array]
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
        arrayCopy[randomIndex], arrayCopy[currentIndex]];
    }
    return arrayCopy
};