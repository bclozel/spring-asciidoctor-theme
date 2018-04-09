# Spring Asciidoctor Theme

This project builds an Asciidoctor documentation theme for Spring projects.

## How to build

Running `./gradlew build` will build and package the theme in a Jar file.

When working on the theme, one can run the following command:

```
$ ./gradlew gulp_dev
```

This will start a local server on `http://localhost:8080`
, watch files under `src/**` and rebuild automatically.
Please consider installing [the Livereload browser 
extension](http://livereload.com/) for a better experience.


### Using Npm and Gulp

You can install the Gulp CLI and directly run build commands:

```
$ npm i -g gulp-cli
$ gulp dev
```