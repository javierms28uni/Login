import {Locator, Page, expect} from '@playwright/test';

export class SuccessLoginModal {
    private title: Locator;
    private description: Locator;
    private okButton: Locator;

    constructor(private container: Locator) {
        this.title = this.container.getByRole('heading', { name: 'Bienvenido' })
        this.description = this.container.getByText('Has accedido a tu cuenta')
        this.okButton = this.container.getByRole('button', {name: 'OK'});
    }


    async isVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.description).toBeVisible();
        await expect(this.okButton).toBeVisible();
    }

}
