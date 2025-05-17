import {test, expect} from '@playwright/test';
import {LoginModal} from "../src/components/LoginModal";
import {HomePage} from "../src/pages/HomePage";
import {ErrorLoginModal} from '../src/components/ErrorLoginModal';

test.describe('Login tests', () => {
    let loginModal: LoginModal;
    let home: HomePage;

    test.beforeEach(async ({page}) => {
        await page.goto('https://m.apuestas.codere.es/');
        home = new HomePage(page);
        loginModal = await home.openLoginModal();
    });

    test('Login should fail with incorrect credentials', async ({page}) => {
        await loginModal.login('IncorrectUser', 'incorrectPass');
        const errorModal = home.getErrorLoginModal();
        await errorModal.isVisible();
    });

    // test('Login should succeed with valid credentials', async ({page}) => {
    //     await loginModal.login('correctUser', 'correctPass');
    //
    //     // Steps for successful login should go here
    // });
    test('The password eye icon works and shows and hides the password', async ({page}) => {
        await loginModal.expectTogglePasswordVisibilityWorks();
    });
    test('All login modal elements are visible', async () => {
        await loginModal.isVisible();
    });

    test('Modal closes when clicking the close button', async () => {
        await loginModal.closeModal();
    });

    test('Clicking on "Regístrate" redirects to the onboarding page', async ({page}) => {
        await loginModal.goToOnboarding();
        await expect(page).toHaveURL('https://m.apuestas.codere.es/deportesEs/#/mso/RegistroNewPage?animate=false');
    });

    test('Clicking on "¿Olvidaste tu contraseña?" shows the recovery modal', async ({page}) => {
        await loginModal.clickForgotPassword();
        await expect(page.getByText('Recordar contraseña')).toBeVisible();
        // Superficial test: for more complete coverage, the modal should be modeled and full functionality verified. Left as-is since it's a different flow.
    });

});
