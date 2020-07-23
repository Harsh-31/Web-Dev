//  BASIC PART OF THE ACTIVITY - HACKERRANK CODE SUBMISSION

let puppeteer = require("puppeteer");
//npm install puppeteer
let gPage;
let {email, password} = require("../../../credentials.json");
let bopenP = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]

})
bopenP.then(function(browser){
    console.log("Browser opened");
    let bPagesP= browser.pages();
    return bPagesP;

}).then(function (allPages){
    //console.log(allPages.length);
    let page = allPages[0];
    let pageWillBeOpened = page.goto("https://www.hackerrank.com/auth/login");
    gPage = page;
    return pageWillBeOpened;

}).then(function(res){
    console.log("Google home page");
    //console.log(res);
    let emailType = gPage.type("#input-1", email);
    return emailType;

}).then(function (){
    let passwordTypeP = gPage.type("#input-2", password);
    return passwordTypeP;

}).then(function(){
    let loginBtnWillBeClickedP = gPage.click("button[data-analytics='LoginPassword']");
    let navigationPromise = Promise.all([loginBtnWillBeClickedP, gPage.waitForNavigation({waitUntil: "networkidle0"})]);
    return navigationPromise;

}).then(function(){
    console.log("user");
    let ipCardWillBeClickedP = gPage.click("a.ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link");
    let navigationPromise = Promise.all([ipCardWillBeClickedP, gPage.waitForNavigation({waitUntil: "networkidle0"})]);
    return navigationPromise;

}).then(function(){
    //network
    let waitForwarmupCardp = gPage.waitForSelector("a.ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link");
    return waitForwarmupCardp;

})
.then(function(){
    console.log("Reached IP Page Link");
    let warmUpChallangeP = gPage.click("a.ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link");
    let navigationPromise = Promise.all([warmUpChallangeP, gPage.waitForNavigation({waitUntil: "networkidle0"})]);
    return navigationPromise;

}).then(function(){
    //network
    let waitForwarmupCardp = gPage.waitForSelector("a.js-track-click.challenge-list-item");
    return waitForwarmupCardp;

}).then(function(){
    console.log("Reached WarmUpChallange");
    let solveChallangeP = gPage.click("a.js-track-click.challenge-list-item");
    let navigationPromise = Promise.all([solveChallangeP, gPage.waitForNavigation({waitUntil: "networkidle0"})]);
    return navigationPromise;

}).then(function(){
    console.log("Reached solve challange");
})