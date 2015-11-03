var test = require ("./index");

var context = {
  done: function (a, b) {
    console.log(JSON.stringify(b));
  }
};

var event = {
  token: "Cv7wWE4RbosWNn7SSezJWKlZ",
  team_id: "T0001",
  team_domain: "example",
  channel_id: "C2147483705",
  channel_name: "test",
  timestamp: "1355517523.000005",
  user_id: "U2147483697",
  user_name: "Steve",
  text: "会社に行く。遠赤両面グリル。Hello World",
  trigger_word: "googlebot:"
}

test.handler(event, context);

