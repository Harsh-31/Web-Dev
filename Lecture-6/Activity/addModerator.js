let puppeteer = require("puppeteer");
// npm install puppeteer
let gPage;
let { email, password } = require("../../credentials.json");
(async function () {
    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        })
        let pages = await browser.pages();
        let page = pages[0];
        gPage = page
        await page.goto("https://www.hackerrank.com/auth/login");
        await page.type("#input-1", email);
        await page.type("#input-2", password);
        await navigatorFn("button[data-analytics='LoginPassword']");
        await page.waitForSelector("a[data-analytics='NavBarProfileDropDown']", { visible: true });
        await page.click("a[data-analytics='NavBarProfileDropDown']");
        await page.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']", { visible: true });
        await navigatorFn("a[data-analytics='NavBarProfileDropDownAdministration']")
        await page.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", { visible: true });
        let allTabs = await page.$$(".nav-tabs.nav.admin-tabbed-nav li");
        await Promise.all([allTabs[1].click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
        // let challenges = require("./challenge");
        let createChallengePageLink = page.url();
        //

        console.log(createChallengePageLink)
        // for (let i = 0; i < challenges.length; i++) {
        //     await page.goto(createChallengePageLink);
        //     await createChallenge(challenges[i]);
        // }
        // console.log("Navigated");
        handleSinglePage(browser);
    } catch (err) {
        console.log(err);
    }
})();
async function navigatorFn(selector) {
    try {
        await Promise.all(
            [gPage.click(selector),
            gPage.waitForNavigation({ waitUntil: "networkidle0" })]);
        console.log("Successfully Navigated to next page");
    } catch (err) {
        return err;
    }
}
async function handleSinglePage(browser) {

    await gPage.waitForSelector(".backbone.block-center",
        { visible: true });
    let allAnchors = await gPage.$$(".backbone.block-center");
    // console.log(allAnchors.length);
    let allLinksP = []

    for (let i = 0; i < allAnchors.length; i++) {
        let linkP = gPage.evaluate(
            function (elem) { return elem.getAttribute("href") }
            , allAnchors[i]);
        allLinksP.push(linkP);
    }
    let allLinks = await Promise.all(allLinksP);
    // console.log(allLinks)
    let fullLinkArr = allLinks.map(function (elem) { return `https://www.hackerrank.com${elem}` });
    // console.log(fullLinkArr)
    let allMP = []
    for (let i = 0; i < fullLinkArr.length; i++) {
        let nTab = await browser.newPage();
        let AddModeratorP = createModerator(nTab, fullLinkArr[i]);
        allMP.push(AddModeratorP)
    }
    await Promise.all(allMP);
    console.log("All Moderators of one page added");

    let allPaginationNavs = await gPage.$$(".pagination ul li");
    let nxtPageTab = allPaginationNavs[allPaginationNavs.length - 2];
    let isDisabled = await gPage.evaluate(function (elem) { return elem.getAttribute("class") }, nxtPageTab);
    if (isDisabled == "disabled") {
        return;
    } else {
        await Promise.all([nxtPageTab.click(), gPage.waitForNavigation({ waitUntil: "networkidle0" })]);
        handleSinglePage(browser);
    }

}
async function createModerator(nTab, url) {
    try {
        await nTab.goto(url);
        await handleConfirmBtn(nTab);
        await nTab.waitForSelector("li[data-tab='moderators']",
            { visible: true });
        await Promise.all([nTab.click("li[data-tab='moderators']"),
        nTab.waitForNavigation({ waitUntil: "networkidle0" })]);
        await nTab.waitForSelector("#moderator", { visible: true });
        await nTab.type("#moderator", "Harsh");
        await nTab.keyboard.press("Enter");
        await nTab.click(".save-challenge.btn.btn-green");
        await nTab.close();
    } catch (err) {
        return err;
    }
    // open page
    // enter name of moderator
    // submit
}
async function handleConfirmBtn(nTab) {
    try {
        await nTab.waitForSelector("#confirm-modal", { visible: true, timeout: 3000 });
        await nTab.click("#confirmBtn");
    } catch (err) {
        console.log("Confirm Modal Not found")
        return;
    }

}