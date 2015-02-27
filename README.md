# OfficeUI.Beta

Tap into [OfficeUI.Beta](https://github.com/Kevin-De-Coninck/OfficeUI.Beta), The most intuitive user interface for web applications.

OfficeUI.Beta is an Open Source implementation of the Office User Interface controls like Microsoft is using them in their applications such as Microsoft Word, Microsoft Outlook, Microsoft Excel, ... but then for web applications. In other words, you are able to recreate (part) of the Office User Interface, further called OfficeUI in any Web Application.

The following controls are supported in the OfficeUI.Beta (with more to come with next releases):

* **Ribbon:**       The OfficeUI Ribbon like Microsft is using it in their entire Office Suite.

## Note

This project is called 'Beta', which really does mean that it's a beta version. So when you're downloading this package, keep in mind that some things might not be working or might generate some issues.
But thanks to this project and the users which are using it, we are able to develop a robust OfficeUI implementation. In case you download this package and some things are not working, feel free to report those issues on the [Issue](https://github.com/Kevin-De-Coninck/OfficeUI.Beta/issues) page of the project.

## Downloading & Installing

When I'm developing the OfficeUI Suite, I'm using a variety of tools with installed plugins to make the development easy.
Those tools and plugins are listed below. Please note that it's not required to have this tool installed to run this application, but I'll provide some usage on how to use this one:

* [Brackets.IO](http://brackets.io/): Brackets.IO is a modern Open Source editor in which you can manage HTML websites.

After you have installed Brackets.IO, there are a couple of extensions which can be installed. Some of them are required, others are optional.

### Required

* [Brackets Beautify](https://github.com/drewhamlett/brackets-beautify): Used to formatting code.
* [Brackets Less AutoCompile](https://github.com/jdiehl/brackets-less-autocompile): Used to compile LESS files into CSS files.
* [Brackets Minifier](https://github.com/wylst/brackets-minifier): Used to minify HTML, CSS and JavaScript files.

### Optional

* [Brackets Code Foling](https://github.com/thehogfather/brackets-code-folding): Used to enable code-folding in the editor. This can make development easier.
* [Brackets Git](https://github.com/zaggino/brackets-git): Only used to communicate with Git. If you don't have any intentions to push something to git or do some other git-based operations, this extension isn't needed
* [Brackets File Icons](https://github.com/drewbkoch/Brackets-File-Icons): In general, this is just an extension to prettify the editor itself. It provides icons on the various files, so that at a quick glance, you can say what kind of file it is.

After the installation of those extensions is complete, in Brackets.IO navigate to 'Edit' and tick the following 2 items:

* Minify on Save.
* Beautify on Save.

## Remarks

Since there are 2 tools installed, 'Minified on Save' and 'Beautify on Save', we should never touch minified files. This is because the beautifier does run after the minifier, which means that the effect of the minification has been lost.
CSS files itself should be touched once after they have been generated or modified by the CSS Less compiler. This is beacause when the LESS compiler modified the CSS files, the minified files are not updated.