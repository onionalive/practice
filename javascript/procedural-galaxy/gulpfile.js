"use strict";

const gulp = require("gulp");
const babel = require("gulp-babel");
const browserify = require("gulp-browserify");
const sass = require("gulp-sass");

gulp.task("javascript", () =>
  gulp
    .src("src/index.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(
      browserify({
        insertGlobals: true
      })
    )
    .pipe(gulp.dest("dist"))
);

gulp.task("sass", () => {
  return gulp
    .src("./sass/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./css/"));
});

gulp.task("default", ["clean", "javascript", "sass"]);
