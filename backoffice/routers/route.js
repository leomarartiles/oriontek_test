var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var validator = require('express-validator');

module.exports = function (app) {

      function isUserAllowed(req, res, next) {
            sess = req.session;
            if (sess.user) {
                  return next();
            }
            else { res.redirect('/login'); }
      }

      app.get('/', isUserAllowed, function (req, res) {
            res.locals = { title: 'Empresa' };
            res.render('Companies/adm-companies');
      });

      // app.get('/tracking', function (req, res) {
      //       res.locals = { title: 'Trayectoria' };
      //       res.render('Tracking/map-tracking');
      // });

      // Layouts 
      app.get('/companies', isUserAllowed, function (req, res) {
            res.locals = { title: 'Empresa' };
            res.render('Companies/adm-companies');
      });

      app.get('/clients', isUserAllowed, function (req, res) {
            res.locals = { title: 'Clientes' };
            res.render('Clients/adm-clients');
      });
      
      app.get('/users', isUserAllowed, function (req, res) {
            res.locals = { title: 'Usuarios' };
            res.render('Users/adm-users');
      });

      app.get('/client-address', isUserAllowed, function (req, res) {
            res.locals = { title: 'Direcciones' };
            res.render('ClientAddress/adm-address');
      });
      
    
      // Icons
      app.get('/icons-remix', isUserAllowed, function (req, res) {
            res.locals = { title: 'Remix Icons' };
            res.render('Icons/icons-remix');
      });
      app.get('/icons-materialdesign', isUserAllowed, function (req, res) {
            res.locals = { title: 'Material Design Icons' };
            res.render('Icons/icons-materialdesign');
      });
      app.get('/icons-dripicons', isUserAllowed, function (req, res) {
            res.locals = { title: 'Dripicons' };
            res.render('Icons/icons-dripicons');
      });
      app.get('/icons-fontawesome', isUserAllowed, function (req, res) {
            res.locals = { title: 'Font Awesome 5' };
            res.render('Icons/icons-fontawesome');
      });

      // Maps
      app.get('/maps-google', isUserAllowed, function (req, res) {
            res.locals = { title: 'Google Maps' };
            res.render('Maps/maps-google');
      });
      app.get('/maps-vector', isUserAllowed, function (req, res) {
            res.locals = { title: 'Vector Maps' };
            res.render('Maps/maps-vector');
      });

}