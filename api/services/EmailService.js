'use strict';

/**
 * Email service
 *
 * @description :: Email text templates
 * @module      :: api/services/EmailService
 * @docs        :: http://sailsjs.org/#!documentation/concepts/services
 */

module.exports = {
    /**
     * @description     Send invite email to the specified email
     * @param           {Object}    options    Email and name used in the template
     *
     * @example
     * // ...in a controller
     * EmailService.sendInviteEmail({email:'achrafchouk@gmail.com', name:'Ach'});
     */
    sendInviteEmail: function (options){
        var _url = '<insert-link-here>';

        var opts = {
            type: 'messages',
            call: 'send',
            message: {
                subject: res.i18n('s.email.invite.subject'),
                from_email: 'hello@writr.co',
                from_name: res.i18n('s.email.invite.from_name'),
                to: [{
                    email: options.email,
                    name: options.name
                }],
                text: res.i18n('s.email.invite.text', options.name, _url)
            }
        };

        //myEmailSendingLibrary.send(opts);
    }
};
