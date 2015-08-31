'use strict';

/**
 * Passport Middleware
 *
 * @module      :: Policy
 * @description :: Initializes Passport.js and as well as its built-in session support.
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * In a typical web application, the credentials used to authenticate a user
 * will only be transmitted during the login request. If authentication
 * succeeds, a session will be established and maintained via a cookie set in
 * the user's browser.
 *
 * Each subsequent request will not contain credentials, but rather the unique
 * cookie that identifies the session. In order to support login sessions,
 * Passport will serialize and deserialize user instances to and from the
 * session.
 *
 * For more information on the Passport.js middleware, check out:
 * http://passportjs.org/guide/configure/
 */

module.exports = function (req, res, next){
    // Initialize Passport
    PassportService.initialize()(req, res, function (){
        // Use the built-in sessions
        PassportService.session()(req, res, function (){
            // Make the user available throughout the frontend
            res.locals.user = req.user;
            next();
        });
    });
};
