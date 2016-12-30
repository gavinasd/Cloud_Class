
module.exports.sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//错误返回，因为数据调用的参数传递错误
module.exports.errorWithParameters = function (res) {
  this.sendJSONresponse(res,400,{
    "message":"All fields required"
  });
};

