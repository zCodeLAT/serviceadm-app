const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

//Tomamos los datos de local.signup
passport.use('local.signup', new LocalStrategy({
    usernameField:'username',
    passworfField:'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const {fullname}= req.body;
    const newUser = {
        username, //es igual a username: username,
        password,
        fullname 
    };
    const rows = await pool.query('SELECT * FROM users WHERE username = ?',[username]);
    if(rows.length>0){
        done(null, false, req.flash('message', 'El usuario '+username+' ya existe'));
    }
    else {
        newUser.password = await helpers.encryptPassword(password);
        const result = await pool.query('INSERT INTO users SET ?', [newUser]);
        newUser.id = result.insertId; //agregamos ID
        return done(null, newUser); 
    }
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0) {
        const user = rows[0];
        const validPasswod = await helpers.matchPassword(password, user.password);
        if(validPasswod){
            done(null, user, req.flash('success', 'Bienvenido '+user.username));
        }
        else {
            done(null, false, req.flash('message', 'Password incorrecto'));
        }
    }
    else {
        return done(null, false, req.flash('message', 'Usuario no existe'));
    }
}));

//metodo de passport para guardar usuario en la session
passport.serializeUser((user, done)=> {  
    done(null, user.id); //callback
});
//Utilizamos el id previamente guardado en session
passport.deserializeUser(async (id, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});