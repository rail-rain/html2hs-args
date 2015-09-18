"use strict";

var HTML_SPLITER = /(<([\w-]+)(?:\s[^>]*)?>(?:.*?<\/\2>)?|[^<]+)/g,
  TAG_SPLITER = /^<([\w-]+)(\s[^>]*)?>(.*?)(?:<\/\1>)?$/;

var tagParse = function (hyper, _, name, attributes, children) {
  if (children) {
    children =
      divideUpNodes(hyper, children.match(HTML_SPLITER), name);
  }
  if (attributes) {
    attributes = attributes
      .replace(/ ([\w-]+?)="(.+?)"/g, ',"$1":"$2"')
      .substr(1);
    attributes = JSON.parse(attributes);
  }
  return hyper(name, attributes, children);
};

var divideUpNodes = function (hyper, nodes) {
  return nodes.map(function (node) {
    if (node.indexOf("<") === 0) {
      return node.replace(TAG_SPLITER, tagParse.bind(null, hyper));
    }
    return JSON.stringify(node);
  });
};

module.exports = function(html, hyper, callback) {
  var result = html
    .replace(/[\n\r]/g, "")
    .replace(/<!--.*?-->/g, "")
    .replace(TAG_SPLITER, tagParse.bind(null, hyper));
  callback(null, result);
};
