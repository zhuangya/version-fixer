'use strict';

var fs = require('fs');
var path = require('path');

var program = require('commander');
var Package = require('./package');

program.version(Package.version)
  .option('-d, --directory <dir>', 'project directory')
  .parse(process.argv);

function readProject (dir) {
  var p = require(path.join(dir, 'package.json'));

  var dep = p.dependencies;

  var fixedDep = Object.keys(p.dependencies).reduce(function (soFar, module) {
    var _p = require(path.join(dir, 'node_modules', module, 'package.json'));
    soFar[module] = _p.version;
    return soFar;
  }, {});

  p.dependencies = fixedDep;
  return p;
}

console.log(readProject(program.directory));

