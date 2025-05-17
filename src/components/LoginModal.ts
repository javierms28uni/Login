import {Locator, Page, expect} from '@playwright/test';

export class LoginModal {
    private usernameInput: Locator;
    private passwordInput: Locator;
    private submitButton: Locator;
    private onboardingButton: Locator;
    private recoverPassLink: Locator;
    private helpText: Locator;
    private hideButton: Locator;
    private showButton: Locator;
    private closeButton: Locator;

    constructor(private container: Locator) {
        this.usernameInput = container.getByRole('textbox', {name: 'Usuario / Correo electrónico'});
        this.passwordInput = container.getByRole('textbox', {name: 'Contraseña'});
        this.submitButton = container.locator('button[id="btnaccess"]');
        this.onboardingButton = container.getByRole('button', {name: 'Regístrate'}); // I would report the lack of an ID, I don't like selecting elements by text, it's not robust
        this.closeButton = container.locator('button[class=closeModal]'); // I don't like using classes, they often change; I would report the lack of an ID to keep element selection consistent
        this.recoverPassLink = container.getByRole('button', {name: '¿Olvidaste tu contraseña?'});
        this.helpText = container.getByText('¿Aún no estás registrado? '); // Same thing, it's not robust; I'm selecting it for the test, but if the parent div with class=goReg is always the same, we could consider using that hierarchy; however, I’d try to select all elements in a consistent way using IDs
        this.hideButton = container.locator('ion-icon[name="eye-off"]');
        this.showButton = container.locator('ion-icon[name="eye"]');
    }


    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async closeModal() {
        await expect(this.closeButton).toBeVisible();
        await expect(this.closeButton).toBeEnabled();
        await this.closeButton.click();
        await expect(this.container).not.toBeVisible();
    }


    async isVisible() {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.submitButton).toBeVisible();
        await expect(this.onboardingButton).toBeVisible();
        await expect(this.recoverPassLink).toBeVisible();
        await expect(this.helpText).toBeVisible();
        await expect(this.showButton).toBeVisible();
        await expect(this.hideButton).not.toBeVisible();
        await expect(this.closeButton).toBeVisible();
    }

    async expectTogglePasswordVisibilityWorks() {
        const testPassword = 'password';
        await this.passwordInput.fill(testPassword);
        await expect(this.showButton).toBeVisible();
        await expect(this.hideButton).not.toBeVisible();
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
        await expect(this.passwordInput).toHaveValue(testPassword);
        await this.showButton.click();
        await expect(this.hideButton).toBeVisible();
        await expect(this.showButton).not.toBeVisible();
        await expect(this.passwordInput).toHaveAttribute('type', 'text');
        await expect(this.passwordInput).toHaveValue(testPassword);
        await this.hideButton.click();
        await expect(this.showButton).toBeVisible();
        await expect(this.hideButton).not.toBeVisible();
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
        await expect(this.passwordInput).toHaveValue(testPassword);
    }

    async goToOnboarding() {
        await expect(this.onboardingButton).toBeVisible();
        await this.onboardingButton.click();
    }

    async clickForgotPassword() {
        await expect(this.recoverPassLink).toBeVisible();
        await this.recoverPassLink.click();
    }

}
