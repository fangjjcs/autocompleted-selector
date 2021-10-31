const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');


const getUsers = async (req, res, next) => {
  // const error = new HttpError(
  //   'Fetching users failed, please try again later.',
  //   500
  // );
  // return next(error);
  res.json({ users: ["1","2","3","4","6"]});
};



const getData = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);
  setTimeout(()=>{
    res.json({
      message: 'Logged in!',
      data: {chart:[1,2,3,4,5]}
    });
  },3000)

};

exports.getUsers = getUsers;
exports.getData = getData;
