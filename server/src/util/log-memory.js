import path from "path";
import fs from "fs";
import os from "os";

const toGb = (value) => value / 1024 / 1024 / 1024;
const roundGb = (value) => Math.round(value * 100) / 100;

export default function logMemory(intervalInMs = 420) {
  setInterval(() => {
    const mu = process.memoryUsage();
    // # bytes / KB / MB / GB
    const gbNow = mu["heapUsed"];

    const rss = toGb(mu["rss"]);
    const heapTotal = toGb(mu["heapTotal"]);
    const heapUsed = toGb(mu["heapUsed"]);
    const external = toGb(mu["external"]);
    const arrayBuffers = toGb(mu["arrayBuffers"]);

    console.log(
      "----------------------------------------------------------------------------------------------------"
    );
    console.log(`resident set size(RSS): ${roundGb(rss)}`);
    console.log(`heap total: ${roundGb(heapTotal)}`);
    console.log(`heap used: ${roundGb(heapUsed)}`);
    console.log(`external: ${roundGb(external)}`);
    console.log(`array buffers: ${roundGb(arrayBuffers)}`);
    console.log(
      "----------------------------------------------------------------------------------------------------"
    );
  }, intervalInMs);
}
