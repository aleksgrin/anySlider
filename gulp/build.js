import gulp from "gulp";

gulp.task("build", () => {
  gulp.src("src/js/imagineSlider.js").pipe(gulp.dest("test/"));
});
