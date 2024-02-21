export function normalError(e) {
  if (!e) return;

  if (!(e instanceof Error)) {
    e = new Error(e);
  }

  throw e;
}

export default { normalError };
