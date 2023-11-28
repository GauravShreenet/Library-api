import Joi from 'joi';

export const newUserValidation = (req, res, next)=>{
    try {

        //model what your validation is
        const scheme = Joi.object({
            fName: Joi.string().required(),
            lName: Joi.string().required(),
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            phone: Joi.string().allow("", null),
            password: Joi.string().required(),
        })

        const {error} = scheme.validate(req.body);
        if (error) {
            return res.json({
                status: 'error',
                message: error.message
            })
        }
        next();
    } catch (error) {
        next(error);
    }
}

export const loginValidation = (req, res, next)=>{
    try {

        //model what your validation is
        const scheme = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().required(),
        })

        const {error} = scheme.validate(req.body);
        if (error) {
            return res.json({
                status: 'error',
                message: error.message
            })
        }
        next();
    } catch (error) {
        next(error);
    }
}