var fs = require('fs');
var through = require('through2');

var rasterHead = function(i, type) {
    return (i == 0) ? "module.exports = 'data:image/" + getMimeType(type) + ";base64," : '';
};

var svgHead = function(i, type) {
    return (i == 0) ? "module.exports = 'data:image/svg+xml," : '';
};

var rasterTail = function() {
    return "'";
};

var svgTail = function() {
    return "'";
};

var isImg = function(file) {
    return (/\.((lit)?gif|png|jpg|jpeg|svg)$/).exec(file);
};

var getMimeType = function(type) {
    if (type == 'jpg') {
        return 'jpeg';
    }

    return type;
};

function rasterStream(file, type) {
    var bitmap = fs.readFileSync(file);
    var base64 = new Buffer(bitmap).toString('base64');

    var i = -1;
    var buffers = [];

    return through(
        function(buf, enc, next) {
            i++;

            if (i == 0) {
                this.push(rasterHead(i, type));
            }

            buffers.push(buf);

            next();
        },
        function(end) {
            this.push(base64);
            this.push(rasterTail());

            end();
        }
    );
}

function svgStream(file, type) {
    var i = -1;

    return through(
        function(buf, enc, next) {
            i++;

            this.push(svgHead(i, type));
            this.push(encodeURIComponent(buf.toString('utf-8')));

            next();
        },
        function(end) {
            this.push(svgTail());

            end();
        }
    );
}

module.exports = function(file) {
    if (!isImg(file)) {
        return through();
    }

    var type = isImg(file)[1];

    if (type == 'svg') {
        return svgStream(file, type)
    }

    return rasterStream(file, type)
}
