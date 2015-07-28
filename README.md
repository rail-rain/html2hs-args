# html2hs-args

pass the converted html into hyperscript to Second argument

## demo

``` js
var html2hs = require('html2hs-args');
var h = require('hyperscript');
html2hs("<span><span></span></span>", h, function (err, data) {
  console.log(data.outerHTML);// > <span><span></span></span>
});
```

## cloned

this is cloned [html2hscript](https://github.com/twilson63/html2hscript)
And this was modified some of the source code of it

Copyright (c) 2015 twilson63
[MIT](http://opensource.org/licenses/mit-license.php)