const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); //motor de plantillas
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys'); //llama conexión keys.js

// initializations
const app = express();
require('./lib/passport');

//settings (3th configuracion de hbs)
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //Views folder path
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'), //ruta de layouts
  partialsDir: path.join(app.get('views'), 'partials'),
  extname:'hbs', //sets .hbs instead .handlebars
  helpers: require('./lib/handlebars') //funcionalidades de handlebars
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({ //crea express-session
  secret: 'estebanmartinmysqlsession',
  resave: 'false',
  saveUninitialized: false,
  store: new MySqlStore(database) //chequear seguridad
}));
app.use(flash()); //Para enviar mensajes al usuario.
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //4to
app.use(express.json());//5to para enviar y recibir jsons
app.use(passport.initialize());
app.use(passport.session()); //Administrador de sesiones

//global variables
app.use((req, res, next)=>{
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message'); //Se creó para mostrar error en el login
  app.locals.user = req.user; //accedo a user desde caulquier vista
  next();
});

//Routes (2th)
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links')); // asigna prefijo "/links"

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server (1st)
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
