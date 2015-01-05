"use strict";

/*
 * Superagent promisification
 */
var Request = require("superagent").Request;


Request.prototype.exec = function () {
  let req = this;

  return new Promise(function (resolve, reject) {
    req.end(function (error, res) {
      if (error) return reject(error);
      resolve(res);
    });
  });
};
