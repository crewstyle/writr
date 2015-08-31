'use strict';

/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate users is via a username
 * and/or email as well as a password. This module provides functions both for
 * registering entirely new users, assigning passwords to already registered
 * users and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

var crypto = require('crypto'),
    validator = require('validator');

/**
 * @description     Register a new user.
 * @param           {Request} req       Request object
 * @param           {Response} res      Response object
 * @param           {Function} next     Callback
 *
 * This method creates a new user from a specified email, username and password
 * and assign the newly created user a local Passport.
 */
exports.register = function (req, res, next){
    var email = req.param('email'),
        username = req.param('username'),
        password = req.param('password');

    if (!email) {
        req.flash('error', 's.passport.email.missing');
        return next(new Error('s.passport.email.missing'));
    }

    if (!username) {
        req.flash('error', 's.passport.username.missing');
        return next(new Error('s.passport.username.missing'));
    }

    if (!password) {
        req.flash('error', 's.passport.password.missing');
        return next(new Error('s.passport.password.missing'));
    }

    User.create({
        username: username,
        email: email
    }, function (err, user){
        if (err) {
            if ('E_VALIDATION' === err.code) {
                if (err.invalidAttributes.email) {
                    req.flash('error', 's.passport.email.exists');
                }
                else {
                    req.flash('error', 's.passport.user.exists');
                }
            }

            return next(err);
        }

        // Generating accessToken for API authentication
        var token = crypto.randomBytes(48).toString('base64');

        Passport.create({
            protocol: 'local',
            password: password,
            user: user.id,
            accessToken: token
        }, function (err, passport){
            if (err) {
                if ('E_VALIDATION' === err.code) {
                    req.flash('error', 's.passport.invalid.password');
                }

                return user.destroy(function (destroyErr){
                    next(destroyErr || err);
                });
            }

            next(null, user);
        });
    });
};

/**
 * @description     Assign local Passport to user.
 * @param           {Request} req       Request object
 * @param           {Response} res      Response object
 * @param           {Function} next     Callback
 *
 * This function can be used to assign a local Passport to a user who doens't
 * have one already. This would be the case if the user registered using a
 * third-party service and therefore never set a password.
 */
exports.connect = function (req, res, next){
    var user = req.user,
        password = req.param('password');

    Passport.findOne({
        protocol: 'local',
        user: user.id
    }, function (err, passport){
        if (err) {
            return next(err);
        }

        if (!passport) {
            Passport.create({
                protocol: 'local',
                password: password,
                user: user.id
            }, function (err, passport){
                next(err, user);
            });
        }
        else {
            next(null, user);
        }
    });
};

/**
 * @description     Validate a login request.
 * @param           {Request} req           Request object
 * @param           {string} identifier
 * @param           {string} password
 * @param           {Function} next         Callback
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 */
exports.login = function (req, identifier, password, next){
    var isEmail = validator.isEmail(identifier),
        query = {};

    if (isEmail) {
        query.email = identifier;
    }
    else {
        query.username = identifier;
    }

    User.findOne(query, function (err, user){
        if (err) {
            return next(err);
        }

        if (!user) {
            if (isEmail) {
                req.flash('error', 's.passport.email.not.found');
            }
            else {
                req.flash('error', 's.passport.username.not.found');
            }

            return next(null, false);
        }

        Passport.findOne({
            protocol: 'local',
            user: user.id
        }, function (err, passport){
            if (passport) {
                passport.validatePassword(password, function (err, res){
                    if (err) {
                        return next(err);
                    }

                    if (!res) {
                        req.flash('error', 's.passport.password.wrong');
                        return next(null, false);
                    }
                    else {
                        return next(null, user);
                    }
                });
            }
            else {
                req.flash('error', 's.passport.password.not.set');
                return next(null, false);
            }
        });
    });
};
