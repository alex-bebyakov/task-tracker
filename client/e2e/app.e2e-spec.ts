import {AppPage} from "./app.po";

describe('dixit App', function () {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
