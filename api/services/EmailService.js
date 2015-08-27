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
        var opts = {
            type: 'messages',
            call: 'send',
            message: {
                subject: 'You\'r In!',
                from_email: 'hello@writr.co',
                from_name: 'Writr ♥ ~ Come in the book!',
                to: [
                    {
                        email: options.email,
                        name: options.name
                    }
                ],
                text: 'Dear ' + options.name + ',\nYou\'re in the Beta! Click <insert link> to verify your account.'
            }
        };

        //myEmailSendingLibrary.send(opts);
    }
};
