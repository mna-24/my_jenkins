import puppeteer from 'puppeteer';
import { expect } from 'chai';

describe('Index.html Tests', function () {
    this.timeout(10000); // Increase timeout for Puppeteer

    let browser;
    let page;

    before(async () => {
        console.log('Launching Puppeteer...');
        browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        console.log('Browser launched successfully!');
        page = await browser.newPage();
        console.log('Opening index.html...');
        await page.goto(`file://${process.cwd()}/index.html`);
        console.log('Page loaded!');
    });

    after(async () => {
        await browser.close();
    });

    it('should have the correct title', async () => {
        const title = await page.title();
        expect(title).to.equal('Simple Home Page');
    });

    it('should contain the header element with correct text', async () => {
        const headerText = await page.$eval('header', el => el.textContent.trim());
        expect(headerText).to.equal('Welcome to My Website');
    });
});
