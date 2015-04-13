# imgurify

[Browserify](http://browserify.org/) transform that allows you to require images -> base64\* data uri's.

\* base64 only for raster images, svgs have data:image prefix, but inlined as svg+xml, because [reasons](https://css-tricks.com/probably-dont-base64-svg/).

## Install

```bash
npm install --save imgurify
```

## Use

```bash
browserify -t imgurify entry.js
```

```javascript
var pony = require('./graphics/pony.png')
console.log(pony)
// => data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcA...
```

## Changelog

### 1.1.0

* Support for svg

### 1.0.0

* Initial release :tada:

enjoy.
