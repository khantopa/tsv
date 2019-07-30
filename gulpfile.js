const gulp = require('gulp');

const rename = require('gulp-rename');

function copyDevConfig() {
  gulp.src(['./server/config/config.dev.json']).pipe(rename('config.json')).pipe(gulp.dest('./server/config'));
  return gulp.src(['./server/components/express/express.dev.service.js']).pipe(rename('express.service.js')).pipe(gulp.dest('./server/components/express')); 
}

function copyProdConfig() {
  gulp.src(['./server/config/config.prod.json']).pipe(rename('config.json')).pipe(gulp.dest('./server/config')); 
  return gulp.src(['./server/components/express/express.prod.service.js']).pipe(rename('express.service.js')).pipe(gulp.dest('./server/components/express'));
}

let serve = gulp.series(copyDevConfig);

let prod = gulp.series(copyProdConfig);

gulp.task('serve', serve);

gulp.task('prod', prod);
