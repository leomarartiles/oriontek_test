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
            res.locals = { title: 'Dashboard' };
            res.render('Dashboard/index');
      });

      // app.get('/tracking', function (req, res) {
      //       res.locals = { title: 'Trayectoria' };
      //       res.render('Tracking/map-tracking');
      // });

      // Layouts 
      app.get('/layouts-light-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Light Sidebar' };
            res.render('Dashboard/index');
      });
      app.get('/layouts-compact-sidebar', isUserAllowed, function (req, res) {
            res.locals = { title: 'Compact Sidebar' };
            res.render('Dashboard/index');
      });
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
      
    

      //Ecommerce
      app.get('/ecommerce-products', isUserAllowed, function (req, res) {
            res.locals = { title: 'Products' };
            res.render('Ecommerce/ecommerce-products');
      });

      app.get('/ecommerce-product-detail', isUserAllowed, function (req, res) {
            res.locals = { title: 'Product Detail' };
            res.render('Ecommerce/ecommerce-product-detail');
      });

      app.get('/ecommerce-orders', isUserAllowed, function (req, res) {
            res.locals = { title: 'Orders' };
            res.render('Ecommerce/ecommerce-orders');
      });

      app.get('/ecommerce-customers', isUserAllowed, function (req, res) {
            res.locals = { title: 'Customers' };
            res.render('Ecommerce/ecommerce-customers');
      });

      app.get('/ecommerce-cart', isUserAllowed, function (req, res) {
            res.locals = { title: 'Cart' };
            res.render('Ecommerce/ecommerce-cart');
      });

      app.get('/ecommerce-checkout', isUserAllowed, function (req, res) {
            res.locals = { title: 'Checkout' };
            res.render('Ecommerce/ecommerce-checkout');
      });

      app.get('/ecommerce-shops', isUserAllowed, function (req, res) {
            res.locals = { title: 'Shops' };
            res.render('Ecommerce/ecommerce-shops');
      });

      app.get('/ecommerce-add-product', isUserAllowed, function (req, res) {
            res.locals = { title: 'Add Product' };
            res.render('Ecommerce/ecommerce-add-product');
      });


      //kanban board
      app.get('/apps-kanban-board', isUserAllowed, function (req, res) {
            res.locals = { title: 'Kanban Board' };
            res.render('KanbanBoard/apps-kanban-board');
      });

      // Utility
      app.get('/pages-starter', isUserAllowed, function (req, res) {
            res.locals = { title: 'Starter page' };
            res.render('Pages/pages-starter');
      });
      app.get('/pages-maintenance', isUserAllowed, function (req, res) {
            res.locals = { title: 'Maintenance' };
            res.render('Pages/pages-maintenance');
      });
      app.get('/pages-comingsoon', isUserAllowed, function (req, res) {
            res.locals = { title: 'Coming Soon' };
            res.render('Pages/pages-comingsoon');
      });
      app.get('/pages-timeline', isUserAllowed, function (req, res) {
            res.locals = { title: 'Timeline' };
            res.render('Pages/pages-timeline');
      });
      app.get('/pages-faqs', isUserAllowed, function (req, res) {
            res.locals = { title: 'FAQs' };
            res.render('Pages/pages-faqs');
      });
      app.get('/pages-pricing', isUserAllowed, function (req, res) {
            res.locals = { title: 'Pricing' };
            res.render('Pages/pages-pricing');
      });
      app.get('/pages-404', isUserAllowed, function (req, res) {
            res.locals = { title: '404 Error' };
            res.render('Pages/pages-404');
      });
      app.get('/pages-500', isUserAllowed, function (req, res) {
            res.locals = { title: '500 Error' };
            res.render('Pages/pages-500');
      });





      // Charts
      app.get('/charts-apex', isUserAllowed, function (req, res) {
            res.locals = { title: 'Apex charts' };
            res.render('Charts/charts-apex');
      });
      app.get('/charts-chartjs', isUserAllowed, function (req, res) {
            res.locals = { title: 'Chartjs' };
            res.render('Charts/charts-chartjs');
      });
      app.get('/charts-flot', isUserAllowed, function (req, res) {
            res.locals = { title: 'Flot Chart' };
            res.render('Charts/charts-flot');
      });
      app.get('/charts-knob', isUserAllowed, function (req, res) {
            res.locals = { title: 'Jquery Knob' };
            res.render('Charts/charts-knob');
      });
      app.get('/charts-sparkline', isUserAllowed, function (req, res) {
            res.locals = { title: 'Sparkline Chart' };
            res.render('Charts/charts-sparkline');
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