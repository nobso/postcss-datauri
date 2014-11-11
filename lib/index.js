/*
 * Copyright (c) 2014, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var colors = require('colors/safe'),
    datauri = require('datauri'),
    fs = require('fs'),
    path = require('path'),
    reduceFunctionCall = require('reduce-function-call'),
    validURL = require('valid-url');

module.exports = plugin;

function plugin(options) {
    var baseDir = '.';

    // if base dir is given, just assume all the images are relative to this dir 
    if (options && options.baseDir) {
        baseDir = options.baseDir;
    }

    return function(style) {
        style.eachDecl(function declaration(decl) {
            var imageFile;

            if ((decl.prop.toLowerCase().indexOf('background') > -1) && decl.value.indexOf('url(') > -1) {
                if (baseDir === '.' && decl.source.file) {
                    baseDir = path.dirname(decl.source.file);
                }

                decl.value = reduceFunctionCall(decl.value, 'url', function(value) {
                    value = value.replace(/["|']/gm, '');

                    // works only on absolute url
                    if (!validURL.isWebUri(value)) {
                        imageFile = path.join(baseDir, value);

                        if (fs.existsSync(imageFile)) {

                            // get the content from datauri object
                            return 'url(' + new datauri(imageFile).content + ')';
                        } 
                        console.log(colors.yellow('postcss-datauri: %s - %s'), colors.blue(imageFile), colors.red(' this image file does not exist'));
                    }
                });
            }
        });
    };
}
