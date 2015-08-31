'use strict';

/**
 * Passport schema
 *
 * @description     Schema to define a Passport
 * @module          api/models/Passport
 * @see             http://sailsjs.org/#!documentation/models
 *
 * The Passport model handles associating authenticators with users. An authenticator can
 * be either local (password) or third-party (provider). A single user can have multiple
 * passports, allowing them to connect and use several third-party strategies in optional
 * conjunction with a password.
 *
 * Since an application will only need to authenticate a user once per session,
 * it makes sense to encapsulate the data specific to the authentication process
 * in a model of its own. This allows us to keep the session itself as light-
 * weight as possible as the application only needs to serialize and deserialize
 * the user, but not the authentication data, to and from the session.
 */

var bcrypt = require('bcrypt');

module.exports = {
    schema: true,

    attributes: {
        /** all specifications for schema below */

        /**
         * Defines the protocol to use for the passport. When employing the local
         * strategy, the protocol will be set to 'local'. When using a third-party
         * strategy, the protocol will be set to the standard used by the third-
         * party service (e.g. 'oauth', 'oauth2', 'openid').
         */
        protocol: {
            type: 'alphanumeric',
            defaultsTo: 'local',
            required: true
        },

        /**
         * When the local strategy is employed, a password will be used as the
         * means of authentication along with either a username or an email.
         */
        password: {
            type: 'string',
            minLength: 8
        },

        /**
         * Used to authenticate API requests. it is generated when a 
         * passport (with protocol 'local') is created for a user.
         */
        accessToken: {
            type: 'string'
        },

        /**
         * Name of the third-party auth service  in all lowercase (e.g. 'github', 'facebook')
         */
        provider: {
            type: 'alphanumericdashed'
        },

        /**
         * Provider-specific key, typically and ID.
         *
         * `provider` and `identifier` are used as the main means of
         * identifying a passport and tying it to a local user.
         */
        identifier: {
            type: 'string'
        },

        /**
         * Used in the case of the OAuth standards. When using OAuth 1.0,
         * a `token` as well as a `tokenSecret` will be issued by the provider.
         * In the case of OAuth 2.0, an `accessToken` and a `refreshToken`
         * will be issued.
         */
        tokens: {
            type: 'json'
        },

        /** all specifications for relations to other models below */

        user: {
            model: 'User'
        },

        /** all getters and setters */

        /**
         * @description     Validate password used by the local strategy.
         * @param           {String} passwd         Password to compare
         * @param           {Function} cb
         */
        validatePassword: function (passwd, cb){
            bcrypt.compare(passwd, this.password, cb);
        }
    },

    /**
     * @description     Callback to be run before creating a Passport.
     * @param           {Object} pObj           The soon-to-be-created Passport
     * @param           {Function} cb
     */
    beforeCreate: function (pObj, cb){
        if (!pObj.hasOwnProperty('password')) {
            return cb({
                err: [
                    res.i18n('m.passport.no.password.defined')
                ]
            });
        }

        if (!uObj.password || uObj.password !== uObj.confirmation) {
            return cb({
                err: [
                    res.i18n('m.passport.does.not.match.confirmation')
                ]
            });
        }

        bcrypt.hash(pObj.password, 10, function (err, hash){
            if (err) {
                return cb(err);
            }

            uObj.password = hash;
            cb();
        });
    },

    /**
     * @description     Callback to be run before updating a Passport.
     * @param           {Object} pObj           Values to be updated
     * @param           {Function} cb
     */
    beforeUpdate: function (pObj, cb){
        if (pObj.newPassword && pObj.newPassword !== pObj.confirmation) {
            return cb({
                err: [
                    res.i18n('m.passport.does.not.match.confirmation')
                ]
            });
        }

        bcrypt.compare(pObj.currentPassword, pObj.password, function (err, valid){
            if (err) {
                return cb(err);
            }

            if (!valid) {
                return cb({
                    err: [
                        res.i18n('m.passport.does.not.match.old.password')
                    ]
                });
            }

            bcrypt.hash(pObj.newPassword, 10, function (err, hash){
                if (err) {
                    return cb(err);
                }

                pObj.password = hash;
                cb();
            });
        });
    }
};
