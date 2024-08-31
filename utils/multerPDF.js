const multer = require("multer");

function multerPDF(
  destination,
  fieldName,
  filenameCallback,
  fileFilterCallback
) {
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: filenameCallback,
  });
  const multerFilter = (req, file, cb) => {
    if (fileFilterCallback(req, file)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs are allowed"), false);
    }
  };
  return multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  }).single(fieldName);
}

module.exports = multerPDF;
