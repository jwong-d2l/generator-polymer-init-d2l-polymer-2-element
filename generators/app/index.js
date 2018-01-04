'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const slugify = require('slugify');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('generator-polymer-init-d2l-polymer-2-element') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Please enter the name of the project (e.g. text-input):',
      default: slugify(this.appname)
    },{
      type: 'input',
      name: 'description',
      message: 'Please enter a description of the project (e.g. Polymer-based web component for D2L text inputs):',
      default: ''
    },];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );
		this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );
		this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
		this.fs.copy(
      this.templatePath('.travis.yml'),
      this.destinationPath('.travis.yml')
    );
		this.fs.copy(
      this.templatePath('wct.conf.json'),
      this.destinationPath('wct.conf.json')
    );
		this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
				name: this.props.name,
				description: this.props.description
			}
    );
		this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'), {
				name: this.props.name,
				description: this.props.description
			}
    );

  }

  install() {
    this.installDependencies();
  }
};
