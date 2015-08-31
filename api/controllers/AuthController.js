'use strict';

/**
 * AuthController
 *
 * @description     Server-side logic for managing Auths
 * @module          api/models/Auth
 * @see             http://sailsjs.org/#!documentation/concepts/controllers
 */

module.exports = {
    /**
     * @description     Create a third-party authentication endpoint.
     * @param           {Request} req       Request object
     * @param           {Response} res      Response object
     */
    provider: function (req, res){
        PassportService.endpoint(req, res);
    },

    /**
     * @description     Render the login page with a list of available providers.
     * @param           {Request} req       Request object
     * @param           {Response} res      Response object
     *
     * The login form itself is just a simple HTML form:
     *
     * <form role="form" action="/auth/local" method="post">
     *     <input type="text" name="identifier" placeholder="Username or Email">
     *     <input type="password" name="password" placeholder="Password">
     *     <button type="submit">Sign in</button>
     * </form>
     *
     * You could optionally add CSRF-protection as outlined in the documentation:
     * http://sailsjs.org/#!documentation/config.csrf
     *
     * A simple example of automatically listing all available providers in a
     * Handlebars template would look like this:
     *
     * {{#each providers}}
     *     <a href="/auth/{{slug}}" role="button">{{name}}</a>
     * {{/each}}
     */
    login: function (req, res){
        var strategies = sails.config.passport,
            providers = {};

        // Get a list of available providers for use in your templates.
        Object.keys(strategies).forEach(function (key){
            if ('local' === key) {
                return;
            }

            providers[key] = {
                name: strategies[key].name,
                slug: key
            };
        });

        // Render the `auth/login.ext` view
        res.view({
            providers: providers,
            errors: req.flash('error')
        });
    },

    /**
     * @description     Log out a user and return them to the homepage.
     * @param           {Request} req       Request object
     * @param           {Response} res      Response object
     * 
     * Passport exposes a logout() function on request (also aliased as logOut()) that can be
     * called from any route handler which needs to terminate a login session. Invoking logout()
     * will remove the request.user property and clear the login session (if any).
     *
     * For more information on logging out users in Passport.js, check out:
     * http://passportjs.org/guide/logout/
     */
    logout: function (req, res){
        req.logout();
        req.session.authenticated = false;
        res.json(200, true);
        //res.redirect('/');
    },

    /**
     * @description     Render the registration page.
     * @param           {Request} req       Request object
     * @param           {Response} res      Response object
     *
     * Just like the login form, the registration form is just simple HTML:
     *
     * <form role="form" action="/auth/local/register" method="post">
     *     <input type="text" name="username" placeholder="Username">
     *     <input type="text" name="email" placeholder="Email">
     *     <input type="password" name="password" placeholder="Password">
     *     <button type="submit">Sign up</button>
     * </form>
     */
    register: function (req, res){
        res.view({
            errors: req.flash('error')
        });
    },

    /**
     * @description     Disconnect a passport from a user.
     * @param           {Request} req       Request object
     * @param           {Response} res      Response object
     */
    disconnect: function (req, res){
        PassportService.disconnect(req, res);
    },

    /**
     * @description     Create a authentication callback endpoint.
     * @param           {Request} req       Request object
     * @param           {Response} res      Response object
     *
     * This endpoint handles everything related to creating and verifying Pass-
     * ports and users, both locally and from third-aprty providers.
     *
     * Passport exposes a login() function on req (also aliased as logIn()) that
     * can be used to establish a login session. When the login operation
     * completes, user will be assigned to req.user.
     *
     * For more information on logging in users in Passport.js, check out:
     * http://passportjs.org/guide/login/
     */
    callback: function (req, res){
        var tryAgain = function (err){
            // Only certain error messages are returned via req.flash('error', someError)
            // because we shouldn't expose internal authorization errors to the user.
            // We do return a generic error and the original request body.
            var flashError = req.flash('error')[0];

            if (err && !flashError ) {
                req.flash('error', res.i18n('c.auth.passport.generic.authorization'));
            }
            else if (flashError) {
                req.flash('error', flashError);
            }

            req.flash('form', req.body);

            // If an error was thrown, redirect the user to the
            // login, register or disconnect action initiator view.
            // These views should take care of rendering the error messages.
            var action = req.param('action');

            if ('register' === action) {
                res.redirect('/register');
            }
            else if ('disconnect' === action) {
                res.redirect('back');
            }
            else {
                res.redirect('/login');
            }
        };

        PassportService.callback(req, res, function (err, user, challenges, statuses){
            if (err || !user) {
                return tryAgain(challenges);
            }

            req.login(user, function (err){
                if (err) {
                    return tryAgain(err);
                }

                // Mark the session as authenticated to work with default Sails sessionAuth.js policy
                req.session.authenticated = true

                // Upon successful login, send the user to the homepage were req.user
                // will be available.
                res.redirect('/');
            });
        });
    }
};
