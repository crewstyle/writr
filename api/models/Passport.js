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

module.exports = {
    schema: true,

    attributes: {
        /** all specifications for schema below */

        /**
         * Defines the protocol to use for the passport.
         */
        protocol: {
            type: 'alphanumeric',
            defaultsTo: 'local',
            required: true
        },

        /**
         * If the local strategy is employed, a password will be used as the
         * means of authentication along with either a username or an email.
         */
        password: {
            type: 'string',
            minLength: 8
        },

        /**
         * Name of the third-party auth service.
         */
        provider: {
            type: 'alphanumericdashed'
        },

        /**
         * Provider-specific key, typically and ID.
         */
        identifier: {
            type: 'string'
        },

        /**
         * Used in OAuth standards: can contains a `tokenSecret`, an `accessToken`, and/or more.
         */
        tokens: {
            type: 'json'
        },

        /** all specifications for relations to other models below */

        user: {
            model: 'User'
        }

        /** all getters and setters */
    }
};
