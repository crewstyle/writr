'use strict';

/**
 * Site schema
 *
 * @description     Schema to define a Site
 * @module          api/models/Site
 * @see             http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        /** all specifications for schema below */

        status: {
            type: 'integer',
            defaultsTo: 0
        },

        title: {
            type: 'string',
            defaultsTo: sails.config.site.title,
            maxLength: 60,
            minLength: 50,
            required: true
        },

        description: {
            type: 'text',
            defaultsTo: sails.config.site.description,
            maxLength: 160,
            minLength: 150,
            required: true
        },

        language: {
            type: 'string',
            defaultsTo: sails.config.i18n.defaultLocale
        },

        perPage: {
            type: 'integer',
            defaultsTo: sails.config.site.per_page
        },

        website: {
            type: 'string',
            defaultsTo: sails.config.site.url
        },

        /** all specifications for relations to other models below */

        owner: {
            model: 'User'
        },

        /** all getters and setters */

        /**
         * @description     Define if the site has any owner
         * @return          {Boolean}
         */
        hasOwner: function (){
            return !!this.owner;
        },

        /**
         * @description     Define if the site is awaiting for moderation
         * @return          {Boolean}
         */
        isPending: function (){
            return this.status === sails.config.statuses.sites.pending;
        },

        /**
         * @description     Define if the site has been refused
         * @return          {Boolean}
         */
        isDenied: function (){
            return this.status === sails.config.statuses.sites.denied;
        },

        /**
         * @description     Define if the site has been approved
         * @return          {Boolean}
         */
        isApproved: function (){
            return this.status === sails.config.statuses.sites.approved;
        }
    }
};
