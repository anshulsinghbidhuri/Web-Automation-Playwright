import {expect} from '@playwright/test';
export class ProductsCase {

    constructor(page) {
        this.page = page;
    }

    //Locators
    ProductsButton() {
       return this.page.getByRole('link', { name: 'Products' });
    }

    procuctLoactor(productName) {
        return this.page.locator(`.product-image-wrapper:has-text("${productName}")`).first();
    }

    productAddToCartButton(productName) {
        return this.page.locator(`.product-image-wrapper:has-text("${productName}") a.add-to-cart`).first();
    }

    searchInput() {
        return this.page.getByRole('textbox', { name: 'Search Product' });
    }

    searchButton() {
       return this.page.locator('.fa.fa-search').first();
    }

    continueShoppingButton() {
        return this.page.getByRole('button', { name: 'Continue Shopping' });
    }

    cartButton() {
        return this.page.getByText('Cart').first();
    }

    crossButton() {
        return this.page.locator('.cart_quantity_delete').first();
    }

    ProceedtoCheckoutButton() {
        return this.page.getByText('Proceed To Checkout');
    }

    addCommentInput() {
        return this.page.locator('.form-control');
    }
    PlaceOrderButton() {
        return this.page.getByText('Place Order');
    }

    cardNameInput() {
        return this.page.locator('input[name="name_on_card"]');
    }

    cardNumberInput() {
        return this.page.locator('input[name="card_number"]');
    }

    CVCInput() {
        return this.page.locator('input[name="cvc"]');
    }

    ExpirationMonthInput() {
        return this.page.locator('input[name="expiry_month"]');
    }

    yearInput() {
        return this.page.locator('input[name="expiry_year"]');
    }
    PayandConfirmOrderButton() {
        return this.page.getByRole('button', { name: 'Pay and Confirm Order' });
    }

    downloadInvoiceButton() {
        return this.page.getByText('Download Invoice');
    }

    continueButton() {
        return this.page.getByText('Continue');
    }

    categoryLocator(categoryName) {
        return this.page.locator(`a[data-toggle="collapse"][href="#${categoryName}"]`).first();
    }

    subCategoryLocator(categoryName, subCategoryName) {
        return this.page.locator(`#${categoryName} a:has-text("${subCategoryName}")`).first();
    }

    brandLocator(brandName) {
        return this.page.locator(`.brands-name a:has-text("${brandName}")`).first();
    }
    //Methods
    async clickOnProductsButton() {
        await this.ProductsButton().click();
    }

    async clickProductAction(productName, action) {
        const product = this.procuctLoactor(productName);
        const addToCart = this.productAddToCartButton(productName);
        if (action === 'Add To Cart') {
            await addToCart.click();
        } else if (action === 'View Product') {
            await product.getByRole('link', { name: 'View Product' }).click();
        }
    }

     async enterProductNameInSearchInput(productName) {
     await this.searchInput().fill(productName);
     await this.searchButton().click();
     }

     async clickOnContinueShoppingButton() {
     await this.continueShoppingButton().click();
     }

     async clickOnCartButton() {
     await this.cartButton().click();
     }
      async clickOnCrossButton() {
      await this.crossButton().click();
    }

     async clickOnProceedToCheckoutButton() {
     await this.ProceedtoCheckoutButton().click();
     }

     async enterCommentAboutOrder(comment) {
     await this.addCommentInput().click();   
     await this.addCommentInput().fill(comment);
     }

     async clickOnPlaceOrderButton() {
     await this.PlaceOrderButton().click();
     }

     async enterCardDetails(cardName, cardNumber, cvc, expirationMonth, year) {
        await this.cardNameInput().fill(cardName);
        await this.cardNumberInput().fill(cardNumber);
        await this.CVCInput().fill(cvc);
        await this.ExpirationMonthInput().fill(expirationMonth);
        await this.yearInput().fill(year);
    }
    
    async clickOnPayandConfirmOrderButton() {
        await this.PayandConfirmOrderButton().click();
    }

    async clickOnDownloadInvoiceButton() {
        await this.downloadInvoiceButton().click();
    }

    async clickOnContinueButton() {
        await this.continueButton().click();
    }

    async clickOnCategory(categoryName, subCategoryName) {
        await this.categoryLocator(categoryName).click();
        await expect(this.page.locator(`#${categoryName}.panel-collapse`)).toBeVisible();
        await this.subCategoryLocator(categoryName, subCategoryName).click();
    }

    async clickOnBrand(brandName) {
        await this.brandLocator(brandName).click();
    }

    //Assertions
    getAllProductsPageTitle() {
        return expect(this.page.getByText('All Products')).toBeVisible();
    }

    getProductDetailPageTitle() {
        return expect(this.page.getByText('Blue Top')).toBeVisible();
    }

    getProductPrice() {
        return expect(this.page.getByText('Rs. 500')).toBeVisible();    
    }

    getProductCategory() {
        return expect(this.page.getByText('Category: Women > Tops')).toBeVisible();
    }

    getSearchProductResult() {
        return expect(this.page.getByText('Searched Products')).toBeVisible();
    }

    getSearchProductName(productName) {
        return expect(this.page.locator('.productinfo').filter({ has: this.page.getByText(productName, { exact: true }) }).getByText(productName).first()).toBeVisible();
    }

    getAddToCartSuccessMessage() {
        return expect(this.page.getByText('Added!')).toBeVisible();
    }
    getyourCartPageTitle() {
        return expect(this.page.getByText('Your product has been added to cart.')).toBeVisible();
    }

    getShoppingcartPageTitle() {
        return expect(this.page.getByText('Shopping Cart')).toBeVisible();
    }
    getYourdeliveryaddress(){
        return expect(this.page.getByText('Your delivery address')).toBeVisible();
    }
    getReviewYourOrder(){
        return expect(this.page.getByText('Review Your Order')).toBeVisible();
    }

    getOrderConfirmationMessage() {
        return expect(this.page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
    }

    }
