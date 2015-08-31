'use strict';

/**
 * Passport Configuration
 * (sails.config.passport)
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

var _local = require('./local');

module.exports.passport = {
    local: {
        strategy: require('passport-local').Strategy
    },

    bearer: {
        strategy: require('passport-http-bearer').Strategy
    },

    // cas: {
    //     name: 'CAS',
    //     protocol: 'cas',
    //     strategy: require('passport-cas').Strategy,
    //     options: {
    //         ssoBaseURL: 'http://your-cas-url',
    //         serverBaseURL: 'http://localhost:1337',
    //         serviceURL: 'http://localhost:1337/auth/cas/callback'
    //     }
    // },

    facebook: {
        name: 'Facebook',
        protocol: 'oauth2',
        strategy: require('passport-facebook').Strategy,
        options: {
            clientID: _local.auth.facebook.clientId,
            clientSecret: _local.auth.facebook.clientSecret,
            scope: ['email']
        }
    },

    // github: {
    //     name: 'GitHub',
    //     protocol: 'oauth2',
    //     strategy: require('passport-github').Strategy,
    //     options: {
    //         clientID: _local.auth.github.clientId,
    //         clientSecret: _local.auth.github.clientSecret
    //     }
    // },

    google: {
        name: 'Google',
        protocol: 'oauth2',
        strategy: require('passport-google-oauth').OAuth2Strategy,
        options: {
            clientID: _local.auth.google.clientId,
            clientSecret: _local.auth.google.clientSecret
        }
    },

    // instagram: {
    //     name: 'Instagram',
    //     protocol: 'oauth2',
    //     strategy: require('passport-instagram').Strategy,
    //     options: {
    //         clientID: _local.auth.instagram.clientId,
    //         clientSecret: _local.auth.instagram.clientSecret,
    //     }
    // },

    // linkedin: {
    //     name: 'LinkedIn',
    //     protocol: 'oauth',
    //     strategy: require('passport-linkedin').Strategy,
    //     options: {
    //         consumerKey: _local.auth.linkedin.consumerKey,
    //         consumerSecret: _local.auth.linkedin.consumerSecret
    //     }
    // },

    twitter: {
        name: 'Twitter',
        protocol: 'oauth',
        strategy: require('passport-twitter').Strategy,
        options: {
            consumerKey: _local.auth.twitter.consumerKey,
            consumerSecret: _local.auth.twitter.consumerSecret
        }
    }

    // wordpress: {
    //     name: 'WordPress',
    //     protocol: 'oauth2',
    //     strategy: require('passport-wordpress').Strategy,
    //     options: {
    //         clientID: _local.auth.wordpress.clientId,
    //         clientSecret: _local.auth.wordpress.clientSecret,
    //     }
    // }
};
