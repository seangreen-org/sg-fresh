console.log('💚', 'deploy');

async function runCommandBailOnError(command) {
  const result = await (Deno.run({ cmd: command.split(' ') })).status();
  if (!result.success) {
    throw new Error(command, 'failed. bailing!');
  }
}

runCommandBailOnError('deno lint');
runCommandBailOnError('npx cypress run');
runCommandBailOnError('git push');
