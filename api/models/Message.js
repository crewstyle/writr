'use strict';

/**
 * Message schema
 *
 * @description     Schema to define a Message
 * @module          api/models/Message
 * @see             http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        /** all specifications for schema below */

        title: {
            type: 'string',
            defaultsTo: '',
            required: true
        },

        content: {
            type: 'text',
            defaultsTo: ''
        },

        status: {
            type: 'integer',
            defaultsTo: 0
        },

        /** all specifications for relations to other models below */

        owners: {
            collection: 'User',
            via: 'messages'
        },

        site: {
            model: 'Site'
        },

        /** all getters and setters */

        /**
         * @description     Define if the message has any owner
         * @return          {Boolean}
         */
        hasOwners: function (){
            return !!this.owners;
        },

        /**
         * @description     Define if the message has any site
         * @return          {Boolean}
         */
        hasSite: function (){
            return !!this.site;
        },

        /**
         * @description     Define if the message is read
         * @return          {Boolean}
         */
        isRead: function (){
            return this.status === sails.config.statuses.messages.read;
        },

        /**
         * @description     Define if the message is still unread
         * @return          {Boolean}
         */
        isUnread: function (){
            return this.status === sails.config.statuses.messages.unread;
        }
    }
};
