'use strict';

/**
 * Entity schema
 *
 * @description     Schema to define a Entity
 * @module          api/models/Entity
 * @see             http://sailsjs.org/#!documentation/models
 */

var scrub = require('url-seo-scrubber');

module.exports = {
    attributes: {
        /** all specifications for schema below */

        slug: {
            type: 'string',
            required: true,
            unique: true
        },

        title: {
            type: 'string',
            required: true
        },

        content: {
            type: 'text',
            defaultsTo: '',
            required: true
        },

        excerpt: {
            type: 'text',
            defaultsTo: ''
        },

        status: {
            type: 'integer',
            defaultsTo: 0
        },

        /** all specifications for relations to other models below */

        author: {
            model: 'User'
        },

        collaborators: {
            collection: 'User',
            via: 'collaborations'
        },

        comments: {
            collection: 'Comment',
            via: 'entity'
        },

        site: {
            model: 'Site'
        },

        /** all getters and setters */

        /**
         * @description     Define if the entity has an author
         * @return          {Boolean}
         */
        hasAuthor: function (){
            return !!this.author;
        },

        /**
         * @description     Define if the entity has any collaborator
         * @return          {Boolean}
         */
        hasCollaborators: function (){
            return !!this.collaborators;
        },

        /**
         * @description     Define if the entity has any comment
         * @return          {Boolean}
         */
        hasComments: function (){
            return !!this.comments;
        },

        /**
         * @description     Define if the entity has any site
         * @return          {Boolean}
         */
        hasSite: function (){
            return !!this.site;
        },

        /**
         * @description     Define if the entity is in draft mode
         * @return          {Boolean}
         */
        isDraft: function (){
            return this.status === sails.config.statuses.entities.draft;
        },

        /**
         * @description     Define if the entity has been scheduled for publish
         * @return          {Boolean}
         */
        isScheduled: function (){
            return this.status === sails.config.statuses.entities.scheduled;
        },

        /**
         * @description     Define if the entity has been published
         * @return          {Boolean}
         */
        isPublished: function (){
            return this.status === sails.config.statuses.entities.published;
        }
    },

    /**
     * @description     Scrubify the title to get a SEO friendly slug
     * @param           {Object} uObj       Entity's details in object
     * @param           {Function} cb       Callback function
     */
    beforeCreate: function (eObj, cb){
        eObj.slug = scrub(eObj.title);
        cb();
    }
};
