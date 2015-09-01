'use strict';

/**
 * Media schema
 *
 * @description     Schema to define a Media
 * @module          api/models/Media
 * @see             http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        /** all specifications for schema below */

        filename: {
            type: 'string',
            required: true
        },

        path: {
            type: 'string',
            required: true
        },

        ext: {
            type: 'string',
            required: true
        },

        details: {
            type: 'json'
        },

        title: {
            type: 'string',
            defaultsTo: '',
        },

        description: {
            type: 'string',
            defaultsTo: '',
        },

        /** all specifications for relations to other models below */

        owner: {
            model: 'User'
        },

        site: {
            model: 'Site'
        },

        /** all getters and setters */

        /**
         * @description     Define if the media has any owner
         * @return          {Boolean}
         */
        hasOwner: function (){
            return !!this.owner;
        },

        /**
         * @description     Define if the media has any site
         * @return          {Boolean}
         */
        hasSite: function (){
            return !!this.site;
        }
    }
};
