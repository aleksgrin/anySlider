const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");

function build() {
  return src("src/js/imagineSlider.js")
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(dest("build/"))
    .pipe(uglify())
    .pipe(
      rename(function(path) {
        path.basename += ".min";
        path.extname = ".js";
      })
    )
    .pipe(dest("build/"));
}

exports.build = build;
