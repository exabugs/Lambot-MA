var fs = require("fs");

var RakutenMA = require("./rakutenma/rakutenma");
var HanZenKaku = require("./rakutenma/hanzenkaku").HanZenKaku;
var model = JSON.parse(fs.readFileSync("./rakutenma/model_ja.min.json"));

rma = new RakutenMA(model);
rma.featset = RakutenMA.default_featset_ja;
rma.hash_func = RakutenMA.create_hash_func(15);


exports.handler = function(event, context) {

  // han->zen
  var text = series([HanZenKaku.h2z, HanZenKaku.hw2fw, HanZenKaku.hs2fs], event.text);

  var tokens = rma.tokenize(text);

  tokens = tokens.reduce(function (memo, token) {
    // remove white space tokens.
    if (token[1] !== 'W') {
      // zen->han
      token[0] = series([HanZenKaku.fs2hs, HanZenKaku.fw2hw], token[0]);
      memo.push(token);
    }
    return memo;
  }, []);

  text = tokens.join("\n");

  context.done(null, {text: text});
};

// utility
function series(array, input) {
  return array.reduce(function (input, func) {
    return func(input);
  }, input);
}

