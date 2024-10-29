async function runCommandBailOnError(command: string) {
  const [cmd, ...args] = command.split(' ');
  const process = new Deno.Command(cmd, { args, stdout: 'inherit', stderr: 'inherit' });
  const { success } = await process.output();

  if (!success) {
    throw new Error(`${command} failed. bailing!`);
  }
}

console.log('💚', 'deploy');
await runCommandBailOnError('deno lint');
await runCommandBailOnError('npx cypress run');
await runCommandBailOnError('git push');
