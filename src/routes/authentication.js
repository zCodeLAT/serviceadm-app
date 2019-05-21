//Contendrá todas las rutas relacionadas con el login
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLogged, isNotLogged } = require('../lib/auth');

router.get('/signup',isNotLogged, (req, res)=>{
    res.render('auth/signup');
});

router.post('/signup',isNotLogged, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

//Renderizo la vista signin. 
router.get('/signin',isNotLogged, (req, res)=>{
    res.render('auth/signin');
});

//Recibo los datos de signin
router.post('/signin',isNotLogged, (req, res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout',isLogged,(req, res)=>{
    req.logOut();
    res.redirect('/signin'); 
})

router.get('/profile', isLogged, (req, res) => {
    res.render('profile');
}) 


module.exports = router;
