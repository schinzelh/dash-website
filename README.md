# Dash Website

## Jekyll 
We are using Jekyll to generate the static html files.
https://jekyllrb.com

### Requirements (mac)
* Ruby: `brew install ruby` (v2.3.3 works, v2.4.0 *does not*)
* Ruby Gems: https://rubygems.org/pages/download
* NodeJS: https://nodejs.org/en/ (Ideally >=4.5.0)
* Python: `brew install python`
* Bundler: `gem install bundler`

### Dependencies
(If you have nvm, do `nvm install && nvm use` first.)

Simply run `npm install` to install all dependencies. This will also run `bundle install` on *postinstall* to install all ruby gems.

**CI Note**: The Gems must also be installed on the CI server. 

**Mac Note**: Bundler will try to install the dependency `nokogiri`. If you are using a Mac, and run into issues related to `nokogiri` during `bundle install`, do the following:

`xcode-select --install`

`gem install nokogiri`

Then run `bundle install`


### Plugins
* `jekyll-multiple-languages-plugin` installed as a gem. Documentation at https://github.com/perrywoodin/jekyll-multiple-languages-plugin. This is a modified fork that adds two new tags for outputting markdown `{% tmd key %}` or `{% translatemd key %}`

(If you still have a `_plugins/jekyll-multiple-languages-plugin` directory in your root folder, you will need to remove it.)

## Development
`npm start` or `npm run watch` to build to the _site directory whenever a file is changed and serve via *localhost:3000*

## Production Build
Production builds should be handled by CI.

`npm run build` will build a fully minified, mangled, and compressed build to the _site directory.

 `npm run htmlproof` will run ImageCheck, ScriptCheck, and LinkCheck on the built "_site" folder "*.html" files. Travis CI will not deploy unless this command finishes successfully!

Mac
xcode-select --install
gem install nokogiri

## i18n
Language variables are set in `/_i18n/*.yml` files. The master language file is `/_i18n/en.yml`. All other languages should use that file as a base. 

### Writing Content

Almost all of the content is defined as a variable in the `/_i18n/*.yml` files. There will be a separate yml file for each language that is supported. The master

Content should be written with little to no html. Do not wrap the content in `<p></p>` tags. If you need separate paragraphs, use two line breaks. For example:

```
Paragraph one


Paragraph two
```

Will render as:
```
<p>Paragraph one</p>
<p>Paragraph two</p>
```

### Displaying Content

#### Strings
To output a variable to a template use:
`{% t key %}`
or
`{% translate key %}`

#### Markdown
To output a variable to a template as markdown use:
`{% tmd key %}`
or
`{% translatemd key %}`

#### Files
i18n files can be saved in their corresponding directories under `/_i18n/`

To include a file use:
`{% tf pagename/blockname.md %}`
or
`{% translate_file pagename/blockname.md %}`

## Writing a Blog Post
Blog posts can be written in MarkDown (*.md) or HTML (*.html).

Posts need to be saved in the `_posts` directory and the filename must always start with YYYY-MM-DD-

For example: `2016-05-12-new-website.md`

###Front matter
The top page of every post should contain the following (Example):
```
author: perry
layout: post
image: /assets/images/2016/05/Node40-banner.jpg
title: New website for Node40
description: Check out the new website for Node40
```

###Blog Post Images
Image paths for blogs are currently relative to /assets/img/blog by default. If we replaced the image path from the front matter above with:
```
	image: MyImage.jpg
```
... will look for `"MyImage.jpg"` in the `/assets/img/blog` folder. 
