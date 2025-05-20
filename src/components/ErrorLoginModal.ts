import {Locator, Page, expect} from '@playwright/test';

export class ErrorLoginModal {
    private title: Locator;
    private description: Locator;
    private okButton: Locator;
    private recoverPassLink: Locator;

    constructor(private container: Locator) {
        this.title = this.container.getByRole('heading', { name: 'Error de inicio de sesión' })
        this.description = this.container.getByText('Por favor, revisa los datos y vuelve a intentarlo. Ten en cuenta el uso de mayúsculas y minúsculas en tu contraseña.');
        this.okButton = this.container.getByRole('button', {name: 'OK'});
        this.recoverPassLink = this.container.getByRole('button', {name: '¿Olvidó su contraseña?'});
    }


    async isVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.description).toBeVisible();
        await expect(this.okButton).toBeVisible();
        await expect(this.recoverPassLink).toBeVisible();
    }

}
