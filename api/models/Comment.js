'use strict';

/**
 * Comment schema
 *
 * @description     Schema to define a Comment
 * @module          api/models/Comment
 * @see             http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        /** all specifications for schema below */

        content: {
            type: 'text',
            required: true
        },

        email: {
            type: 'string',
            email: true,
            required: true
        },

        name: {
            type: 'string',
            defaultsTo: '',
            required: true
        },

        status: {
            type: 'integer',
            defaultsTo: 0
        },

        website: {
            type: 'string',
            defaultsTo: ''
        },

        /** all specifications for relations to other models below */

        children: {
            collection: 'Comment',
            via: 'parent'
        },

        entity: {
            model: 'Entity'
        },

        parent: {
            model: 'Comment'
        },

        author: {
            model: 'User'
        },

        /** all getters and setters */

        /**
         * @description     Define if the comment is awaiting for moderation
         * @return          {Boolean}
         */
        isPending: function (){
            return this.status === sails.config.statuses.comments.pending;
        },

        /**
         * @description     Define if the comment has been refused
         * @return          {Boolean}
         */
        isDenied: function (){
            return this.status === sails.config.statuses.comments.denied;
        },

        /**
         * @description     Define if the comment has been approved
         * @return          {Boolean}
         */
        isApproved: function (){
            return this.status === sails.config.statuses.comments.approved;
        }
    }
};
