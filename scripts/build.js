const fs = require("fs-extra");
const binPath = "./bin/bin.js";
const buildFile = fs.readFileSync(binPath);
fs.writeFileSync(binPath, "#!/usr/bin/env node\n" + buildFile);
