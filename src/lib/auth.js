//Metodo para llamarlo desde las rutas que queremos proteger
module.exports = {
    isLogged(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLogged(req, res, next) {
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
}