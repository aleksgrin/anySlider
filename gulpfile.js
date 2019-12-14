const {src, desr} = require('gulp');

function build() {
  return src('src/js/imagineSlider.js')
  .pipe(dest('newBuild/'))
}



exports.build = build;