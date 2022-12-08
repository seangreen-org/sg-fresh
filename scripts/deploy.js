async function runCommandBailOnError(command) {
  const result = await (Deno.run({ cmd: command.split(' ') })).status();
  if (!result.success) {
    throw new Error(command, 'failed. bailing!');
  }
}

console.log('💚', 'deploy');
runCommandBailOnError('deno lint');
runCommandBailOnError('npx cypress run');
runCommandBailOnError('git push');
