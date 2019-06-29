//Contendrá todas las rutas relacionadas con el login
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLogged, isNotLogged } = require('../lib/auth');

router.get('/register',isNotLogged, (req, res)=>{
    res.render('auth/register');
});

router.post('/register',isNotLogged, passport.authenticate('local.register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
}));

//Renderizo la vista login. 
router.get('/login',isNotLogged, (req, res)=>{
    res.render('auth/login');
});

//Recibo los datos de login
router.post('/login',isNotLogged, (req, res, next)=>{
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout',isLogged,(req, res)=>{
    req.logOut();
    res.redirect('/login'); 
})

router.get('/profile', isLogged, (req, res) => {
    res.render('profile');
}) 


module.exports = router;
