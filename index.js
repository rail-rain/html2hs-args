var Parser = require('htmlparser2').Parser;

var elementStack = [];

function ItemList(parent) {
    this.parent = parent;
    this.content = [];
}

ItemList.prototype.add = function (data) {
    this.content.push(data);
}

module.exports = function(html, h, cb) {
    var currentItemList = new ItemList(null);

    var parser = new Parser({
        onopentag: function (name, attribs) {
            currentItemList = new ItemList(currentItemList);
            elementStack.unshift([ name, attribs ]);
        },
        ontext: function (text) {
            currentItemList.add(text);
        },
        onclosetag: function (tagname) {
            var element = elementStack.shift();
            var elementContent = currentItemList.content;

            currentItemList = currentItemList.parent;

            var attribs = element[1];

            var id = attribs['id'];
            var idSuffix = id !== undefined ? '#' + id : '';
            delete attribs['id'];

            var classNames = attribs['class'];
            var classSuffix = (classNames !== undefined ? classNames : '').split(/\s+/g).filter(function (v) { return v.length > 0; }).map(function (cls) { return '.' + cls; }).join('');
            delete attribs['class'];
            
            var item = h(element[0] + idSuffix + classSuffix,
                attribs,
                elementContent);
            currentItemList.add(item);
        },
        onend: function () {
          cb(null, currentItemList.content[0]);
        }
    }, {decodeEntities: true});

  parser.write(html);
  parser.end();
}