let puppeteer = require("puppeteer");
let gPage, glangCodeElems;
let {email, password} = require("../../credentials.json");
(async function() {
    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        })
        let pages = await browser.pages();
        let page = pages[0];
        gPage = page;
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
        await Promise.all([allTabs[1].click(),page.waitForNavigation({waitUntil:"networkidle0"})]);
        let challenges = require("./challenge");
        let createChallengePageLink = page.url();
        console.log(createChallengePageLink);
        for (let i = 0; i < challenges.length; i++) {
            await page.goto(createChallengePageLink);
            await createChallenge(challenges[i]);
        }
        console.log("Navigated");
    } catch (err) {
        console.log(err);
    }
})();

async function navigatorFn(selector){ //function for navigation
    try{
        await Promise.all(
            [gPage.click(selector),
                gPage.waitForNavigation({waitUntil: "networkidle0"})]);
    } catch (err) {
        return err;
    }
}

async function createChallenge(ch) {     //function for craeting the challanges
    await gPage.waitForSelector(".btn.btn-green.backbone.pull-right", { visible: true });
    await navigatorFn(".btn.btn-green.backbone.pull-right");
    await gPage.waitForSelector("#name", { visible: true });
    await gPage.type("#name", ch["Challenge Name"]);
    await gPage.type("#preview", ch["Description"]);
    await gPage.type("#problem_statement-container .CodeMirror textarea", ch["Problem Statement"]);
    await gPage.type("#input_format-container .CodeMirror textarea", ch["Input Format"]);
    await gPage.type("#constraints-container .CodeMirror textarea", ch["Constraints"]);
    await gPage.type("#output_format-container .CodeMirror textarea", ch["Output Format"]);
    await gPage.type("#tags_tag", ch["Tags"]);
    await gPage.keyboard.press("Enter");
    await gPage.click(".save-challenge.btn.btn-green");
}