'use strict';

/**
 * Adminpanel Configuration
 * (sails.config.adminpanel)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.globals.html
 *
 * @see https://github.com/konstantinzolotarev/sails-hook-adminpanel
 */

var _statuses = require('./statuses');

module.exports.adminpanel = {
    instances: {

        // treat users

        users: {
            title: 'Users',
            model: 'User',

            list: {
                fields: {
                    email: 'Email',
                    username: 'Username',
                    firstName: 'First name',
                    lastName: 'Last name',
                    status: 'Status',
                    createdAt: 'Created'
                }
            },

            edit: {
                fields: {
                    email: 'Email',

                    username: 'Username',

                    firstName: 'First name',

                    lastName: 'Last name',

                    status: {
                        title: 'Status',
                        enum: [_statuses.users]
                    },

                    level: {
                        title: 'Level',
                        disabled: true
                    },

                    avatarUrl: 'Avatar URL'
                }
            }
        },

        // treat entities

        entities: {
            title: 'Entities',
            model: 'Entity',

            list: {
                fields: {
                    title: 'Title',
                    excerpt: 'Excerpt',
                    status: 'Status',
                    createdAt: 'Created'
                }
            },

            edit: {
                fields: {
                    slug: 'Slug',

                    title: 'Title',

                    content: {
                        title: 'Content',
                        type: 'text',
                        editor: true
                    },

                    excerpt: {
                        title: 'Excerpt',
                        type: 'text'
                    },

                    status: {
                        title: 'Status',
                        enum: [_statuses.users]
                    }
                }
            }
        }

        // treat comments

    }
};
