// // module dependencies
// var Product = require('../models/product');

// exports.list = function (req, res, next) {
//   Product.find()
//     .exec()
//     .then(function (products) {
//       res.render('product/products', {
//         title: 'All Products',
//         products: products
//       })
//     }, function (err) {
//       return next(err);
//     });
// };

// exports.createNew = function (req, res) {
//   res.render('product/new', {
//     title: 'Create Product'
//   });
// };

// exports.create = function (req, res, next) {
//   var product = req.body;

//   Product.create(product)
//     .then(function (newProduct) {
//       res.redirect('/products/' + newProduct.id);
//     }, function (err) {
//       return next(err);
//     });
// };

// exports.edit = function (req, res, next) {
//   Product.findById(req.params.id)
//     .exec()
//     .then(function (product) {
//       res.render('product/edit', {
//         title: 'Edit - ' + product.name,
//         product: product
//       });
//     }, function (err) {
//       return next(err);
//     });
// };

// exports.get = function (req, res) {
//   Product.findById(req.params.id)
//     .exec()
//     .then(function (product) {
//       res.render('product/product', {
//         title: product.name,
//         product: product
//       });
//     }, function (err) {
//       return next(err);
//     });
// };

// exports.update = function (req, res) {
//   Product.findByIdAndUpdate(req.params.id, req.body)
//     .exec()
//     .then(function (product) {
//       res.redirect('/products/' + product.id);
//     }, function (err) {
//       return next(err);
//     })
// };

// exports.delete = function (req, res) {
//   Product.remove({_id: req.params.id})
//     .exec()
//     .then(function () {
//       res.redirect('/products');
//     }, function (err) {
//       return next(err);
//     });
// };
