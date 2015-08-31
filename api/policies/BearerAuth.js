'use strict';

/**
 * Bearer Auth
 *
 * @module      :: Policy
 * @description :: Authorizing API requests
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * Policy for authorizing API requests. The request is authenticated if the 
 * it contains the accessToken in header, body or as a query param.
 * Unlike other strategies bearer doesn't require a session.
 * Add this policy (in config/policies.js) to controller actions which are not
 * accessed through a session. For example: API request from another client
 */

module.exports = function (req, res, next){
    return PassportService.authenticate('bearer', {
        session: false
    })(req, res, next);
};
