var _ = require("lodash");

var raygun = {}

raygun.start = function(key) {
  Raygun.sharedReporterWithApiKey(key);
};

raygun.identify = function(val) {
  this._checkIfRunning();

  if (_.isObject(val)) {
    var userInfo = RaygunUserInfo.alloc().initWithIdentifierWithEmailWithFullNameWithFirstNameWithIsAnonymous(
      val.identifier || null, val.email || null, val.fullName || null, val.firstName || null, val.isAnonymous ? true : false
    );
    this._getReporter().identifyWithUserInfo(userInfo);
  } else {
    this._getReporter().identify(val);
  }
}

raygun._checkIfRunning = function() {
  if (this._isRunning() === false) {
    throw new Error("The Raygun service is not running");
  }
};

raygun._isRunning = function() {
  return this._getReporter() !== null;
};

raygun._getReporter = function() {
  return Raygun.sharedReporter();
};

module.exports = raygun;
