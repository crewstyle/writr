'use strict';

/**
 * Statuses Configuration
 * (sails.config.statuses)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.globals.html
 */

module.exports.statuses = {
    comments: {
        pending: 0,
        denied: 1,
        approved: 2
    },

    entities: {
        draft: 0,
        scheduled: 1, //not published/unpublished and scheduled
        published: 2
    },

    messages: {
        unread: 0,
        read: 1
    },

    sites: {
        pending: 0,
        denied: 1,
        approved: 2
    },

    users: {
        registered: 0, //registered but not active
        activated: 1, //registered and active
        blocked: 2 //blacklisted by admin
    }
};
