'use strict';

/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */

module.exports.policies = {

    /***************************************************************************
    *                                                                          *
    * Default policy for all controllers and actions (`true` allows public     *
    * access)                                                                  *
    *                                                                          *
    ***************************************************************************/

    // '*': true,
    '*': [
        'BearerAuth',
        'Passport',
        'SessionAuth'
    ],

    /***************************************************************************
    *                                                                          *
    * Here's an example of mapping some policies to run before a controller    *
    * and its actions                                                          *
    *                                                                          *
    ***************************************************************************/

    AuthController: {
        '*': [
            'Passport'
        ]
    }
    /*UserController: {
        // Apply the `false` policy as the default for all of UserController's actions
        // (`false` prevents all access, which ensures that nothing bad happens to our users)
        '*': false,
        find: true,
        findOne: true,

        // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
        // before letting any users feed our rabbits
        // feed: ['isNiceToAnimals', 'hasRabbitFood']

        // Apply the 'isLoggedIn' policy to the 'edit' action of 'UserController'
        //edit: 'isLoggedIn',
        // Apply the 'isAdmin' AND 'isLoggedIn' policies, in that order, to the 'create' action
        //create: ['isAdmin', 'isLoggedIn']
    }*/

};
