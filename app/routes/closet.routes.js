const { createCloset, deleteCloset, changeCloset, readAllClosets } = require("../controllers/closet.controller.js");
 
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/closet", readAllClosets)
    app.post("/closet", createCloset);
    app.delete("/closet", deleteCloset);
    app.put("/closet", changeCloset);
};