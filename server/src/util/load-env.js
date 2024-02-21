export default async function () {
  if (process.env.NODE_ENV !== "production") {
    await import("dotenv/config");
  }
  return process.env;
}
