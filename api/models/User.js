'use strict';

/**
 * User schema
 *
 * @description     Schema to define a User
 * @module          api/models/User
 * @see             http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {
    attributes: {
        /** all specifications for schema below */

        email: {
            type: 'string',
            email: true,
            required: true
        },

        /*password: {
            type: 'string',
            minLength: 6,
            required: true
        },*/

        status: {
            type: 'integer',
            defaultsTo: 0
        },

        level: {
            type: 'integer',
            defaultsTo: 0
        },

        username: {
            type: 'string',
            defaultsTo: '',
            required: true,
            unique: true
        },

        firstName: {
            type: 'string',
            defaultsTo: ''
        },

        lastName: {
            type: 'string',
            defaultsTo: ''
        },

        avatarUrl: {
            type: 'string',
            defaultsTo: ''
        },

        activationKey: {
            type: 'string',
            defaultsTo: ''
        },

        registeredAt: {
            type: 'date',
            defaultsTo: new Date(0)
        },

        lastLogin: {
            type: 'date',
            defaultsTo: new Date(0)
        },

        /** all specifications for relations to other models below */

        collaborations: {
            collection: 'Entity',
            via: 'collaborators'
        },

        entities: {
            collection: 'Entity',
            via: 'author'
        },

        messages: {
            collection: 'Message',
            via: 'owners'
        },

        passports: {
            collection: 'Passport',
            via: 'user'
        },

        /** all getters and setters */

        /**
         * @description     Returns the user's fullname well formatted
         * @return          {String}
         */
        getFullName: function (){
            return this.firstName + ' ' + this.lastName;
        },

        /**
         * @description     Define if the user has any collaboration
         * @return          {Boolean}
         */
        hasCollaborations: function (){
            return !!this.collaborations;
        },

        /**
         * @description     Define if the user has any entity
         * @return          {Boolean}
         */
        hasEntities: function (){
            return !!this.entities;
        },

        /**
         * @description     Define if the user has any message
         * @return          {Boolean}
         */
        hasMessages: function (){
            return !!this.messages;
        },

        /**
         * @description     Define if the user has any passport
         * @return          {Boolean}
         */
        hasPassports: function (){
            return !!this.passports;
        },

        /**
         * @description     Define if the user has activate its account
         * @return          {Boolean}
         */
        isActivated: function (){
            return this.status === sails.config.statuses.users.activated;
        },

        /**
         * @description     Define if the user has been blacklisted
         * @return          {Boolean}
         */
        isBlocked: function (){
            return this.status === sails.config.statuses.users.blocked;
        },

        /**
         * @description     Returns well formatted JSON of user's details
         * @return          {Object}
         */
        toJSON: function (){
            var uObj = this.toObject();

            delete uObj.password;
            delete uObj._csrf;

            return uObj;
        }
    },

    /**
     * @description     Generate an activation key to send it to the user
     * @param           {Object} uObj       User's details in object
     * @param           {Function} cb       Callback function
     */
    beforeCreate: function (uObj, cb){
        /**
         * @todo Generate new `activationKey` ~ Send mail with key ~ Edit some profile values
         */

        /* ~ Old way to store password ~ Encrypt password before create User in database
        if (!uObj.password || uObj.password !== uObj.confirmation) {
            return cb({err: ['Password doesnt match password confirmation']});
        }

        bcrypt.hash(uObj.password, 10, function (err, hash){
            if (err) {
                return cb(err);
            }

            uObj.password = hash;
            cb();
        });*/
    }

    /**
     * @description     Encrypt password before update User in database
     * @param           {Object} uObj       User's details in object
     * @param           {Function} cb       Callback function
     * @return          {[type]}            [description]
     */
    /*beforeUpdate: function (uObj, cb){
        if (uObj.newPassword && uObj.newPassword !== uObj.confirmation) {
            return cb({err: ['Password doesnt match password confirmation']});
        }

        bcrypt.compare(uObj.currentPassword, uObj.password, function (err, valid){
            if (err) {
                return cb(err);
            }

            if (!valid) {
                return cb({err: ['Password doesnt match with your old password']});
            }

            bcrypt.hash(uObj.newPassword, 10, function (err, hash){
                if (err) {
                    return cb(err);
                }

                uObj.password = hash;
                cb();
            });
        });
    }*/
};
