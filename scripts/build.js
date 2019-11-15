const fs = require("fs-extra");
const buildPath = "./distribute/imagineslider.js";
let buildFile = fs.readFileSync(buildPath);
buildFile = buildFile.toString();

const fileStart = `
(function(window, document, Math) {`;
const fileEnd = `
if (typeof module != "undefined" && module.exports) {
  module.exports = ImagineSlider;
} else if (typeof define == "function" && define.amd) {
  define(function() {
    return ImagineSlider;
  });
} else {
  window.ImagineSlider = ImagineSlider;
}
})(window, document, Math);`;

buildFile = buildFile.replace("export { ImagineSlider };", fileEnd);
fs.writeFileSync(buildPath, fileStart + buildFile);
