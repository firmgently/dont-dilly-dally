all: js/FGDontDillyDally.js css/DDD.css

# Set the source directory
srcdir = src/

# Create the list of modules
modules =   ${srcdir}DDDConsts.js\
            ${srcdir}FGUtils.js\
            ${srcdir}FGHTMLBuild.js\
            ${srcdir}DontDillyDally.js

css = 			${srcdir}DDD.scss


js/FGDontDillyDally.js: ${modules}
	cat > $@ $^
	minify js/FGDontDillyDally.js -o js/FGDontDillyDally.js.min

css/DDD.css: ${css}
	sass $< $@
