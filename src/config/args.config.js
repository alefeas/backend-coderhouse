import { Command } from "commander"

const program = new Command()

program.option('-m, --mode <mode>', 'Mode for different work enviroments', 'development')

program.parse()

console.log('Options: ', program.opts())

export default program.opts()