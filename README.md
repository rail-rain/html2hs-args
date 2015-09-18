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