const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

var multer = require("multer");
var defaultRoute = '/api/v1/product'
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(`${defaultRoute}/list`, controller.getProducts);
  app.post(
    `${defaultRoute}/list`,
    [authJwt.verifyToken, authJwt.isAdmin],
    upload.none(),
    controller.createProduct
  );
  app.delete(
    `${defaultRoute}/:id`,
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProduct
  );
  app.put(
    `${defaultRoute}/:id`,
    [authJwt.verifyToken, authJwt.isAdmin],
    upload.none(),
    controller.updateProduct
  );
};
