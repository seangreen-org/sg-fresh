async function runCommandBailOnError(command) {
  // deno-lint-ignore no-deprecated-deno-api
  const result = await (Deno.run({ cmd: command.split(' ') })).status();
  if (!result.success) {
    throw new Error(command, 'failed. bailing!');
  }
}

console.log('💚', 'deploy');
await runCommandBailOnError('deno lint');
await runCommandBailOnError('npx cypress run');
await runCommandBailOnError('git push');
