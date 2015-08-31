'use strict';

/**
 * UserController
 *
 * @description     Server-side logic for managing Users
 * @module          api/models/User
 * @see             http://sailsjs.org/#!documentation/concepts/controllers
 */

var skipperDisk = require('skipper-disk'),
    util = require('util');

module.exports = {
    /**
     * @description     Upload avatar for currently logged-in user
     * @param           {Request} req           Request
     * @param           {Response} res          Response
     *
     * (POST /user/avatar)
     */
    uploadAvatar: function (req, res){
        req.file('avatar').upload({ maxBytes: sails.config.site.file.max_size },function whenDone (err, uploadedFiles){
            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (0 === uploadedFiles.length) {
                return res.badRequest(res.i18n('c.user.no.file.uploaded'));
            }

            // Save the "fd" and the url where the avatar for a user can be accessed
            User.update(req.session.me, {
                // unique URL where the avatar can be downloaded.
                avatarUrl: util.format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.me),

                // Grab the first file and use it's `fd` (file descriptor)
                avatarFd: uploadedFiles[0].fd
            }).exec(function (err){
                if (err) {
                    return res.negotiate(err);
                }

                return res.ok();
            });
        });
    },

    /**
     * @description     Download avatar of the user with the specified id
     * @param           {Request} req           Request
     * @param           {Response} res          Response
     *
     * (GET /user/avatar/:id)
     */
    avatar: function (req, res){
        req.validate({
            id: 'string'
        });

        User.findOne(req.param('id')).exec(function (err, user){
            if (err) {
                return res.negotiate(err);
            }

            if (!user) {
                return res.notFound();
            }

            // User has no avatar image uploaded.
            // (should have never have hit this endpoint and used the default image)
            if (!user.avatarFd) {
                return res.notFound();
            }

            var fileAdapter = skipperDisk(/* optional opts */);

            // Stream the file down
            fileAdapter.read(user.avatarFd).on('error', function (err){
                return res.serverError(err);
            }).pipe(res);
        });
    }
};
