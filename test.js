const REPL = require("repl")

const Frisky = require(".")
let frisky = new Frisky()

let repl = REPL.start()
repl.context.frisky = frisky
