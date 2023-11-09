function mapFiles(filenames, { lint = true, ts = false } = {}) {
  const eslint = "eslint --fix --cache";
  const typeCheck = "vue-tsc --noEmit -p tsconfig.web.json --composite false";
  const commands = ["prettier --write"];

  if (filenames.length) {
    if (lint) commands.unshift(`${eslint} ${filenames.join(" ")}`);
    if (ts) commands.unshift(typeCheck);
  }

  return commands.map(cmd => (/^vue-tsc/.test(cmd) || /^eslint/.test(cmd) ? cmd : `${cmd} ${filenames.join(" ")}`));
}

module.exports = {
  "*.js": filenames => mapFiles(filenames),
  "*.{ts,vue}": filenames => mapFiles(filenames, { ts: true }),
  "*.{json,md}": filenames => mapFiles(filenames, { lint: false })
};
