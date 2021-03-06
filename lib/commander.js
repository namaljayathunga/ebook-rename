const { join } = require('path');
const program = require('commander');
const i18n = require('../i18n');
const { checkMethodResult, detectFileOrDir, detectFormat, createDirectory, detectMode } = require('./utils');
const { supportedFormats, outputDir } = require('./constant');
const { version } = require('../package');

program
  .option('-d, --directory <path>', i18n.directory, path => checkMethodResult(detectFileOrDir(path)))
  .option('-f, --format <string>', `${i18n.format}`, format => checkMethodResult(detectFormat(format)))
  .option('-o, --output <path>', i18n.output, path => checkMethodResult(createDirectory(path)))
  .option('-m, --mode <string>', `${i18n.mode}`, mode => checkMethodResult(detectMode(mode)))
  .version(version, '-v, --version')
  .parse(process.argv);

program.directory = program.directory || (() => {
  checkMethodResult(detectFileOrDir('./'));
  return './';
})();
program.output = program.output || (() => {
  const output = join('.', outputDir);
  checkMethodResult(createDirectory(output));
  return output;
})();
program.format = program.format || Object.keys(supportedFormats);
program.mode = program.mode || 'jump';

module.exports = {
  directory: program.directory,
  output: program.output,
  format: program.format,
  mode: program.mode
};
