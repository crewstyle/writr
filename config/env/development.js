'use strict';

/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
    * Set the default database connection for models in the development        *
    * environment (see config/connections.js and config/models.js )            *
    ***************************************************************************/

    models: {
        // connection: 'MongodbServer',
        connection: 'localDiskDb',
    },

    /***************************************************************************
    * Set the social networks passport configurations                          *
    ***************************************************************************/

    // facebook
    facebook: {
        clientID: '399799573560322',
        clientSecret: 'd98922f7bb6c01f0f5f54c98705e5324',
        callbackURL: '/auth/facebook/callback',
        //callbackURL: 'http://localhost:' + port + '/auth/facebook/callback',
    },

    // twitter
    twitter: {
        consumerKey: 'fhyqYHSM7lGPkMLYG1AuaLpAH',
        consumerSecret: 'Fstd4uQDCcDQ9Xm0MizAs6jBFMCviAM6UW5XRUzdvDGtktsHCm',
        callbackURL: '/auth/twitter/callback'
    },

    // google+
    google: {
        clientID: '192122328499-iosg3u1m31inuqqoip8qsvqgv884tgo6.apps.googleusercontent.com',
        clientSecret: 'HkZAVVhrwPQvRE6-WmjHLG2A',
        callbackURL: '/auth/google/callback'
    }

};
