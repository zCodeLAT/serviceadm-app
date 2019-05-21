const { format } = require(`timeago.js`); // importamos metodo format de timeago.js

const helpers = {}; //objeto que utilizare en las vistas

helpers.timeago = (timestamp) => {  //recibe un timestamp 
    //console.log(timestamp); 
    return format(timestamp);
};

module.exports = helpers;