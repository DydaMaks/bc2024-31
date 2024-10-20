const { Command } = require('commander');
const fs = require('fs');
const program = new Command();

program
  .requiredOption('-i, --input <path>', 'input file path')
  .option('-o, --output <path>', 'output file path')
  .option('-d, --display', 'display result');

program.parse(process.argv);

const options = program.opts();

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(options.input, 'utf-8'));
const result = data
  .filter(item => item.parent === 'BS3_BanksLiab')
  .map(item => `${item.indicator}:${item.value}`)
  .join('\n');

if (options.display) {
  console.log(result);
}

if (options.output) {
  fs.writeFileSync(options.output, result);
}

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
  }
  