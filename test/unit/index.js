/*
 * Copyright (c) 2014, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/* global describe, it */
'use strict';

var assert = require('assert'),            
    path = require('path'),
    fs = require('fs'),
    postcss = require('postcss'),
    plugin;

plugin = require('../../lib/index.js');

describe('postcss-datauri -> index', function () {

    describe('datauri()', function () {

        it('should be a function.', function () {
            assert.equal(typeof plugin, 'function');
        });

        it('should convert the relative URL to datauri', function (next) {
            var css = fs.readFileSync(path.join(__dirname, '../fixtures/datauri.css'), 'utf-8');
            var out = postcss().use(plugin({baseDir: path.join(__dirname, '../fixtures')})).process(css);
            assert.equal(out.css.indexOf('data') > -1, true);
            next();
        });

        it('should not convert if the image URL is absolute', function (next) {
            var css = fs.readFileSync(path.join(__dirname, '../fixtures/abs-datauri.css'), 'utf-8');
            var out = postcss().use(plugin()).process(css, {
                            map: false, 
                            from: path.join(__dirname, '../fixtures/abs-datauri.css'), 
                            to: path.join(__dirname, '../fixtures/abs-datauri.css')
                        });
            assert.equal(out.css.indexOf('data') > -1, false);
            next();
        });

        it('should log the message if the image URL is invalid', function (next) {
            var css = fs.readFileSync(path.join(__dirname, '../fixtures/invalid-datauri.css'), 'utf-8');
            var out = postcss().use(plugin()).process(css, {
                            map: false, 
                            from: path.join(__dirname, '../fixtures/invalid-datauri.css'), 
                            to: path.join(__dirname, '../fixtures/invalid-datauri.css')
                        });
            assert.equal(out.css.indexOf('undefined') > -1, true);
            next();
        });

    });
});
