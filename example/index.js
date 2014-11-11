/*
* Copyright (c) 2014, Yahoo! Inc. All rights reserved.
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/

var postcss = require('postcss'),
    datauri = require('postcss-datauri'),
    fs = require('fs');

// css that is going to be processed
var css = fs.readFileSync('input.css', 'utf8');

// post-processing the css using postcss-datauri
var out = postcss()
            .use(datauri({baseDir: './'}))
            .process(css);

// the converted dataURI
console.log(out.css);
