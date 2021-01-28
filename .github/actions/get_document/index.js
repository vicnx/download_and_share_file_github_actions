const download = require("download");
const core = require("@actions/core");
const fs = require("fs");

const PREFIX_URL =
  "https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Informe_Comunicacion_";
const SUFFIX_URL = ".ods";

const date = new Date();
const year = date.getFullYear();
const day = `${date.getDate()}`.padStart(2, "0");
const month = `${date.getMonth() + 1}`.padStart(2, "0");

const url = `${PREFIX_URL}${year}${month}${day}${SUFFIX_URL}`;

const filename = `${year}${month}${day}.ods`;

download(url, "./", { filename });

var filePath = "./index.html";

try {
  fs.readFile(filePath, "utf8", function (err, data) {
    var result = data.replace(
      /href=.* download/,
      'href="./' + filename + '"  download'
    );
    fs.writeFile(filePath, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
} catch (error) {
  core.setFailed(error.message);
}

core.setOutput("response", "Loader modificado");
