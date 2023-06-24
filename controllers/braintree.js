'use strict';

const braintreeHelper = {};

braintreeHelper.createBraintreeVaultCustomer = async (email) => {
    const { braintreeGateway } = require('../index');
    const result = await braintreeGateway.customer.create({ email });
    return result;
}

braintreeHelper.deleteBraintreeVaultCustomer = async (customerId) => {
    if (!customerId) return { success: false, message: 'customerId is NULL' };
    try {
        const { braintreeGateway } = require('../index');
        await braintreeGateway.customer.delete(customerId);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message }
    }
}

module.exports = braintreeHelper;