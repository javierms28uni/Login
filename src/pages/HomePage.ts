import {Page, Locator, expect} from '@playwright/test';
import {LoginModal} from '../components/LoginModal';
import {ErrorLoginModal} from '../components/ErrorLoginModal';

export class HomePage {
    private page: Page;
    private loginButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByText('Acceder', {exact: false})
    }

    async openLoginModal(): Promise<LoginModal> {
        await this.loginButton.click();
        const acceptCookiesButton = this.page.getByText('Aceptar todas las cookies');
        await acceptCookiesButton.waitFor({state: 'visible', timeout: 5000});
        await acceptCookiesButton.click();
        const loginModalContainer = this.page.locator(".ion-page .contModal.backgroundheader");
        return new LoginModal(loginModalContainer);
    }

    getErrorLoginModal(): ErrorLoginModal {
        const container = this.page.locator('[class^="alert-wrapper"]');
        return new ErrorLoginModal(container);
    }
}
