'use strict';

/**
 * Site default Configuration
 * (sails.config.site)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.globals.html
 */

var _config = {
    author: 'Writr',
    description: 'A simple writing platform created with ♥ for writers.',
    title: 'Writr',
    url: 'http://www.your-website.com',
};

var _i18n = require('./i18n');

module.exports.site = {
    // site meta
    title: _config.title,
    description: _config.description,
    author: _config.author,
    charset: 'utf-8',

    // open-graph meta
    open_graph: {
        locale: _i18n.i18n.defaultLang,
        type: 'website',
        title: _config.title,
        description: _config.description,
        site_name: _config.title,
        url: _config.url,
    },

    // url and permalink
    root: '/',
    permalink: ':year/:month/:day/:title-:id',
    permalink_sructure: [],
    url: _config.url,

    // locals
    language: _i18n.i18n.defaultLocale,
    locale: _i18n.i18n.defaultLang,

    // date and time
    timezone: '',
    date_format: 'YYYY-MM-DD',
    time_format: 'HH:mm:ss',

    // listing configurations
    per_page: 10,

    // theme
    theme: {
        author: 'Achraf Chouk',
        folder: 'pencil',
        name: 'Pencil for Writr',
        version: '0.0.1',
        url: 'https://github.com/crewstyle/pencil-writr'
    },

    // file upload
    file: {
        max_size: 10000000 // 10Mb
    }
};
