postcss image URL to dataURI converter [![Build Status](https://travis-ci.org/yahoo/postcss-datauri.svg?branch=master)](https://travis-ci.org/yahoo/postcss-datauri)
===========================
It's a simple postCSS plugin which just converts the relative image URL to dataURI

   * it runs thro' the given CSS file and replaces the relative images with dataURI
   * you can also use the optional 'baseDir' so that all the image files look up will be relative to that directory
   
Installation
--------------

`npm install postcss-datauri`

Usage 
-----------
```javascript
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
```

Please check the [example code](example/index.js) 
