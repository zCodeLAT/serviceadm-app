//Todas las rutas encargadas de almacenar, listar, etc los links.
const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLogged } = require('../lib/auth');

router.get('/add', isLogged, (req, res) => {
    res.render('links/add');
    //res.send('Form');
});
router.post('/add', isLogged, async (req, res) => {
    const { title, url, description } = req.body;
    
    const newLink = {
        
        title,
        url,
        description,
        user_id: req.user.id //enlaza link con usuario
    }; 
    
    await pool.query('INSERT INTO links set ?', [newLink]);
    //console.log(newLink);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});

router.get('/', isLogged,async (req, res)=> {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    //console.log(links);
    res.render('links/list', { links });
});
router.get('/delete/:id', isLogged,async (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'El link fue borrado.');
    res.redirect('/links');
});

router.get('/edit/:id', isLogged,async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?'[id], );

    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id',isLogged, async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    console.log(newLink);
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link actualizado');
    res.redirect('/links');
});

module.exports = router;