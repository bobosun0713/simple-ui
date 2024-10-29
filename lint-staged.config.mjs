function mapFiles(filenames, { lint = true, ts = false } = {}) {
  const commands = [];
  const lintCheck = "pnpm lint";
  const typeCheck = "pnpm type-check";
  const formatCheck = "pnpm format";

  if (filenames.length) {
    if (lint) commands.unshift(lintCheck);
    if (ts && filenames.length) commands.unshift(typeCheck);
    commands.push(formatCheck);
  }

  return commands.map(cmd => `${cmd} ${filenames.join(" ")}`);
}

export default {
  "*.{js,mjs,cjs}": filenames => mapFiles(filenames),
  "*.{ts,mts,vue}": filenames => mapFiles(filenames, { ts: true }),
  "*.{json,md}": filenames => mapFiles(filenames, { lint: false })
};
