const mongoose = require("mongoose");
async function run() {
  var legacyDataBase =
    "mongodb+srv://mediun:mediun@cluster0-lv76n.mongodb.net/mediunDB?retryWrites=true&w=majority";
  mongoose
    .connect(legacyDataBase, {
      useNewUrlParser: true,
      useCreateIndex: true,
      dbName: "mediunDB"
    })
    .catch(error => console.log("this is error!", error));

  const { connection } = mongoose;
  var accounts = [];
  const oldData = [];
  connection.once("open", () => {
    console.log("MongoDB legacydataBase connection established successfully");
  });

  var Schema = mongoose.Schema;

  const articleSchema = new Schema({
    id: { type: Number, unique: true },
    authorId: { type: Number },
    title: { type: String },
    subTitle: { type: String },
    pic: { type: String },
    createdAt: { type: Date, default: Date.now },
    readingTime: { type: Number },
    text: { type: String },
    clapsNumber: { type: Number },
    categoryId: { type: Number },
    comments: { type: Array },
    tags: { type: Array }
  });

  const Articles = mongoose.model("Article", articleSchema);

  try {
    accounts = await Articles.find({}, "-_id id_1", (error, data) => {
      if (error) {
        console.log(error, "error");
      } else {
      }
    }).select(
      "title subTitle pic createdAt readingTime categoryId clapsNumber text authorId"
    );
  } catch (erro) {
    console.log("error", erro);
  }
  //connection.close();
  var newRecord = [];
  for (var i = 0; i < accounts.length; i++) {}
  delete mongoose.connection.models["Article"];

  const Adb = require("./database/index").Article;
  // console.log(accounts);
  var art = new Adb(accounts);

  for (var i = 0; i < accounts.length; i++) {
    var obj = {
      authorId: accounts[i]["authorId"],
      title: accounts[i]["title"],
      subTitle: accounts[i]["subTitle"],
      pic: accounts[i]["pic"],
      createdAt: accounts[i]["createdAt"],
      readingTime: accounts[i]["readingTime"],
      text: accounts[i]["text"],
      clapsNumber: accounts[i]["clapsNumber"],
      categoryId: accounts[i]["categoryId"],
      comments: accounts[i]["comments"],
      tags: accounts[i]["tags"]
    };
    oldData.push(obj);
  }
  // Adb.insertMany(accounts, (errors, docs) => {
  //   if (errors) {
  //     console.log(errors);
  //   } else {
  //     console.log(docs);
  //   }
  // });
  // art.save(accounts[0]);
  // Adb.insertMany(accounts, (error, docs) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("don");
  //   }
  // });

  // for (var i = 0; i < accounts.length; i++) {

  //   console.log("gjghg ", art);
  //   var res = await art.save((error, res) => {
  //     if (error) {
  //       console.log("error");
  //     } else {
  //       console.log("don");
  //     }
  //   });
  // }
}

run();
// connection.close();

// module.exports.oldData = oldData;
