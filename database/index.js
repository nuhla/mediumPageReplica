<<<<<<< HEAD
const mongoose = require("../node_modules/mongoose/index.js");
var User = require("./models/User").User;
var Article = require("./models/Article").Article;
var Category = require("./models/Category").Category;
=======
const mongoose = require('../node_modules/mongoose/index.js');
var User =  require('./models/User');
var  Article = require('./models/Article');
var Category = require('./models/Category');
>>>>>>> d546c543e0b0e92ce048a4582e8452b6905da7aa

const uri = "mongodb+srv://fatoom:fatoom@cluster0-hft43.mongodb.net/mediunDB?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: 'mediunDB'
  })
  .catch((error) => console.log('this is error!', error));

const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//need to be refactored
const selectAll = function(obj, id, callback) {
  obj.find({ id: id }, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

const getUsers =  function(callback) {
  User.find({}).
exec(function (err, user) {
  if(err){ console.log(err)}
     else {callback(user)}
})
}; 

const getFeatured= function(callback){
                      Article.find({}).
                      sort(['clapsNumber', 1]).
                      select('title subTitle pic createdAt readingTime categoryId clapsNumber authorId')
                      .exec(function (err, article) {
                        if(err){ console.log(err)}
                           else {callback(article)}
                      }); 

                    }

const getAuthor = function(model, authorId, callback) {
  model.findOne({ id: authorId }).exec(function(err, user) {
    if (err) throw err;
    callback(user);
  });
};

<<<<<<< HEAD
// Article.find({'_id': {'$gt': record_id } }).sort({'_id': 1}).limit(n)

// module.exports.getAuthor = getAuthor;
// module.exports.selectAll = selectAll;
// module.exports.getFeatured = getFeatured;
// module.exports.getCategory = getCategory;
=======
const getCategory = function(model, categoryId, callback) {
  model.findOne({ id: categoryId }).exec(function(err, category) {
    if (err) throw err;
    callback(category);
  });
};

const getLatest = function(callback){
                  Article.find({}).
                  sort(['createdAt', 1]).
                  select('title subTitle pic createdAt readingTime categoryId clapsNumber authorId').
                  exec(function (err, article) {
                    if(err){ console.log(err)}
                       else {callback(article)}
                  });
                }


module.exports.getAuthor = getAuthor;
module.exports.selectAll = selectAll;
module.exports.getUsers = getUsers;
module.exports.getFeatured = getFeatured;
module.exports.getCategory = getCategory;
>>>>>>> d546c543e0b0e92ce048a4582e8452b6905da7aa
module.exports.Category = Category;
module.exports.getLatest = getLatest;
module.exports.Article = Article;
module.exports.User = User;
<<<<<<< HEAD
=======

>>>>>>> d546c543e0b0e92ce048a4582e8452b6905da7aa
