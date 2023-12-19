import Joi from "joi";

const SORTSTR = Joi.string();
const SORTSTRREQUIRED = Joi.string().max(100).required();
const LONGSTR = Joi.string().max(500);
const LONGSTRREQUIRED = Joi.string().max(5000).required();
const NUMBER = Joi.number();
const NUMBERREQUIRED = Joi.number().required();

const validationProcessor = ({ schemaObj, req, res, next }) => {
  try {
    //model what your validation is
    const schema = Joi.object(schemaObj);

    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export const newUserValidation = (req, res, next) => {
  try {
    //model what your validation is
    const schema = Joi.object({
      fName: Joi.string().min(3).required(),
      lName: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().allow("", null),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export const loginValidation = (req, res, next) => {
  try {
    //model what your validation is
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),

      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

// ========= books

export const newBookValidation = (req, res, next) => {
  const schemaObj = {
    thumbnail: LONGSTRREQUIRED,
    name: SORTSTRREQUIRED,
    author: SORTSTRREQUIRED,
    publishYr: NUMBERREQUIRED,
    isbn: SORTSTRREQUIRED,
    description: LONGSTRREQUIRED,
  };

  validationProcessor({ schemaObj, req, res, next });
};

export const updateBookValidation = (req, res, next) => {
  const schemaObj = {
    status: SORTSTRREQUIRED,
    _id: SORTSTRREQUIRED, 
    thumbnail: LONGSTRREQUIRED,
    name: SORTSTRREQUIRED,
    author: SORTSTRREQUIRED,
    publishYr: NUMBERREQUIRED,
    description: LONGSTRREQUIRED,
  };

  validationProcessor({ schemaObj, req, res, next });
};

// ============ burrowValidation
export const newBurrowValidation = (req, res, next) => {
  const schemaObj = {
    bookId: SORTSTRREQUIRED,
    bookName: SORTSTRREQUIRED,
    thumbnail: LONGSTRREQUIRED,
    userId: SORTSTRREQUIRED,
    userName: SORTSTRREQUIRED,
  };

  validationProcessor({ schemaObj, req, res, next });
};

export const newReviewValidation = (req, res, next) => {
  const schemaObj = {
    bookId: SORTSTRREQUIRED,
    bookName: SORTSTRREQUIRED,
    message: LONGSTRREQUIRED,
    burrowHistoryId: SORTSTRREQUIRED,
    title: SORTSTRREQUIRED,
    rating: NUMBERREQUIRED,
  };

  validationProcessor({ schemaObj, req, res, next });
};