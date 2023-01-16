async function sleep(seconds: number, logTimer = true) {
  const ms = seconds * 1000;
  if (logTimer) {
    console.log((`Sleeping ${seconds} seconds`));
  }

  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function executeSleep(sleep_after: number, iterations: number) {
  let clone_sleep_after = sleep_after;
  let clone_iterations = iterations;

  process.stdout.write(' | Wait 30 minutes ..');

  clone_iterations += 1;

  await sleep(60 * 30, false);

  clone_sleep_after = 10000;

  return {
    sleep_after: clone_sleep_after,
    iterations: clone_iterations,
  };
}

export {
  sleep,
  executeSleep,
};
