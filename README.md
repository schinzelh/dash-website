# Dash Website

## Jekyll
We are using Jekyll to generate the static html files.
https://jekyllrb.com

### Requirements (mac)
* Ruby: `brew install ruby`
* Ruby Gems: https://rubygems.org/pages/download
* NodeJS: https://nodejs.org/en/
* Python: `brew install python`
* Bundler: `gem install bundler`

### Supporting Gems
Simply run `bundle install` and [bundler](http://bundler.io/) will install all ruby gems/dependencies.
Note: The Gems must also be installed on the CI server.

### Plugins
* `jekyll-multiple-languages-plugin` installed as a gem. Documentation at https://github.com/perrywoodin/jekyll-multiple-languages-plugin. This is a modified fork that adds two new tags for outputting markdown `{% tmd key %}` or `{% translatemd key %}`

## Development
`jekyll serve` Will build to the _site directory whenever a file is changed and serve via 127.0.0.1

`jekyll build --watch` Will build to the _site directory whenever a file is changed. 

## Production Build
Production builds should be handled by CI.

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
