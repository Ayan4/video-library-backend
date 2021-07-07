const mongoose = require("mongoose");

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "First name is a required field"
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: "Email is a required field.",
      validate: {
        validator: email => emailRegex.test(email),
        message: "must be a valid email address"
      }
    },
    password: {
      type: String,
      required: "Password is a required field"
    }
  },
  { timestamps: true }
);

// userSchema.post("save", function(error, doc, next) {
//   if (error.name === "MongoError" && error.code === 11000) {
//     next(new Error("There was a duplicate key error"));
//   } else {
//     next();
//   }
// });

module.exports = mongoose.model("User", userSchema);

const object = new User({});
object.save(function(err, doc) {
  if (err) {
    const error = mongooseErrorHandler(err);
    console.log(error);
    /**
     * Error [MongooseValidatorError]: "name" is required
     * message: "name" is required
     * name: 'MongooseValidatorError',
     * path: 'name',
     * kind: 'required',
     * value: undefined
     */
  }
});
