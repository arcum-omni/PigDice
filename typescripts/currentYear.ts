/**
 * Displays current year (1999) in the copyright statement
 */
function getYear(){
    let today = new Date();
    let year = today.getFullYear();
    let spanMsg:HTMLElement = <HTMLElement>document.getElementById("span");
    spanMsg.innerHTML = year.toString();
}