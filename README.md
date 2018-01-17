# *Gulp build with dev pipeline and prod exports*

## **Project commands and descriptions**

### `gulp scripts`
###### For all JS files create sourcemaps, concatenate, minify, and export new files

### `gulp styles`
###### For all CSS files create sourcemaps, concatenate, minify, and export new files
###### Refresh after new files are created and written webserver

### `gulp images`
###### For all jpeg and png files compress and export new files

### `gulp icons`
###### For all SVG files compress and export new files

### `gulp clean`
###### Delete build file to avoid corrupted builds

### `gulp watchFiles`
###### On any project scss or sass file change, run 'styles' task

### `gulp html`
###### Locate and replace dev scripts and styles with prod scripts and styles in html

### `gulp build`
###### Groups several Gulp tasks to run in a particular order

### `gulp webserver`
###### Runs webserver with the ability to refresh browser with the 'reload' method

### `gulp`
###### Task that runs 'default' gulp task with 'gulp' command


## **`Project modules required`**
###### 'gulp'
###### 'gulp-uglify'
###### 'gulp-concat'
###### 'gulp-sass'
###### 'gulp-rename'
###### 'gulp-sourcemaps'
###### 'del'
###### 'gulp-useref'
###### 'gulp-if'
###### 'gulp-clean-css'
###### 'gulp-imagemin'
###### 'pump'
###### 'gulp-connect'
