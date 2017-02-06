const gulp = require("gulp"),
watch = require("gulp-watch"),
postcss = require("gulp-postcss"),
browserSync = require("browser-sync"),
prefix = require("autoprefixer"),
nesting = require("postcss-nesting"),
vars = require("postcss-simple-vars");

gulp.task("default", () =>{
  console.log("Default");
})

gulp.task("watch", () =>{
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  })
  watch("./app/assets/styles/**/*.css", () =>{
    gulp.start("cssInjection");
  })
  watch("./app/index.html", () =>{
    browserSync.reload();
  })
})

gulp.task("css", () =>{
  gulp.src("./app/assets/styles/styles.css")
  .pipe(postcss([prefix, nesting, vars]))
  .on("error", (errorStatus) =>{
    console.log("Error " + errorStatus);
    this.emit("end");
  })
  .pipe(gulp.dest("./app/temp/styles/"));
})

gulp.task("cssInjection", ["css"], () =>{
    gulp.src("./app/temp/styles/styles.css")
    .pipe(browserSync.stream());
})
