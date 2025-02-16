#!/usr/bin/env -S deno run --allow-read --allow-run
const KEYS=Deno.args

async function run(command){
  if(typeof(command)=='string') command=command.split(' ')
  let c=new Deno.Command(command[0],{"args":command.slice(1)})
  let o=await c.output()
  return Promise.resolve(new TextDecoder().decode(o.stdout))
}

if(KEYS.length==0) throw 'Usage: `press.js key [key...]`.'
let programs=JSON.parse(await Deno.readTextFile(`${import.meta.dirname}/commands.json`))
let processes=await run('xdotool getactivewindow getwindowname')
for(let p of Object.keys(programs)) if(processes.includes(p)) for(let k of KEYS){
  let command=programs[p][k]
  if(!command) continue
  console.log(`${p} (${k}): ${command}.`)
  await run(command)
}
