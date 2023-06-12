'use strict';

const { body, validationResult } = require('express-validator');

const getErrorMessage = (request) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return errors.array().reduce((message, error) => {
            return message + error.msg + "<br/>";
        }, '');
    }
    return null;
}

module.exports = { body, getErrorMessage };