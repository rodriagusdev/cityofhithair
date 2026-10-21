/**
 * Asynchronously waits for a specified number of milliseconds.
 */
export const waitTimer = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export default waitTimer;
