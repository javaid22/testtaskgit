/*=============================================
=            import            =
=============================================*/

import autoprefixer from "gulp-autoprefixer";
import babel from "gulp-babel";
import browserSync from "browser-sync";
import c from "ansi-colors";
import cssnano from "gulp-cssnano";
import eslint from "gulp-eslint";
import gulp, { dest } from "gulp";
import notify from "gulp-notify";
import sass from "gulp-sass";
import stylelint from "gulp-stylelint";
import uglify from "uglify-js";
import nunjucksRender from "gulp-nunjucks-render";
import bro from "gulp-bro";
import through2 from "through2";
import * as gulpConnect from 'gulp-connect';

/*=============================================
=            paths            =
=============================================*/

var paths = {
    sass: {
        watch: "src/scss/**/*.scss",
        src: [
            "src/scss/index.scss",
        ],
        dest: [
            "web/dist/css"
        ],
        includePaths: ["node_modules/bootstrap/scss"],
    },
    js: {
        src: [
            "node_modules/bootstrap/dist/js/bootstrap.min.js",
            "src/js/**/*.js"
        ],
        dest: [
            "web/dist/js"
        ],
    },
    assets: {
        src: [
            "./src/assets/**/*"
        ],
        dest: [
            "web/dist/assets/"
        ]
    },
    browser: {
        proxy: "http://localhost:8000",
    },
};

/*=============================================
=            functions            =
=============================================*/

const isLinty = (file) => {
    // check if file has any errors or warnings
    return (
        file.eslint != null &&
        (file.eslint.warningCount > 0 || file.eslint.errorCount > 0)
    );
};

/*=============================================
=            tasks            =
=============================================*/

// browserSync
export const browser = () => {
    browserSync({
        proxy: paths.browser.proxy,
        notify: false
    });
};

// scss to css
export const buildStyles = (done) => {
    gulp
        .src(paths.sass.src)
        .pipe(sass({ includePaths: paths.sass.includePaths }))
        .on("error", function (err) {
            console.log(c.red(err.message));
        })
        .on(
            "error",
            notify.onError({
                message: "Error: <%= error.message %>",
            })
        )
        .pipe(
            cssnano({
                autoprefixer: false,
                postcssReduceTransforms: false,
                discardComments: {
                    removeAll: true,
                },
            })
        )
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.sass.dest[0]));
    done();
};

// js
export const buildScripts = (done) => {
    gulp
        .src(paths.js.src)
        .pipe(babel())
        .pipe(bro())
        .pipe(through2.obj(function(file, _, cb) {
            if (file.isBuffer()) {
                const code = uglify.minify(file.contents.toString())
                file.contents = Buffer.from(code.code)
            }
            cb(null, file);
        }))
        .pipe(gulp.dest(paths.js.dest[0]));
    done();
};

// lint styles
export const lintStyles = () => {
    return gulp.src(paths.sass.src).pipe(
        stylelint({
            failAfterError: false,
            reporters: [
                {
                    formatter: "string",
                    save: "scss-lint-report.txt",
                    console: true,
                },
            ],
        })
    );
};

// lint scripts
export const lintScripts = () => {
    return gulp
        .src(paths.js.src)
        .pipe(
            eslint({
                envs: ["browser", "es6", "jquery"],
            })
        )
        .pipe(eslint.format());
};

export const copyFiles = () => {
    return gulp.src(paths.assets.src)
        .pipe(gulp.dest(paths.assets.dest));
}

// watch style changes
export const watchStyles = () => {
    gulp
        .watch(paths.sass.watch, gulp.series(lintStyles, buildStyles, copyFiles))
        .on("change", gulpConnect.reload);
};

// watch script changes
export const watchScripts = () => {
    gulp
        .watch(paths.js.src, gulp.series(lintScripts, buildScripts))
        .on("change", gulpConnect.reload);
};

export const server = () => {
    return gulpConnect.server({
        name: "kreativrudel - jobs",
        root: ["web"],
        port: 8000,
        livereload: true
    });
}

// combine watchers
export const watch = gulp.parallel(watchStyles, watchScripts, server, buildStyles, buildScripts, copyFiles);

// default tasks
const defaultTasks = gulp.series(gulp.parallel(watch));
export default defaultTasks;
