const { createGpe, deleteGpe, changeGpe, readAllGpes } = require("../controllers/gpe.controller.js");
 
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/gpe", readAllGpes)
    app.post("/gpe", createGpe);
    app.delete("/gpe", deleteGpe);
    app.put("/gpe", changeGpe);
};