const { test } = require("@playwright/test");

exports.customtest = test.extend({
  testDataForOrder: {
    username: "avishkargawali120@gmail.com",
    password: "Avishkar9730",
    productName: "iphone 13 pro",
  },
});

