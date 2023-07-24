const Bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/user");
const String = require("../helpers/string");
const Sms = require("../helpers/sms");
const { url } = require("../config/server");

/**********************************************************/
/*                         Registration                   */
/**********************************************************/

const register = async (req, res) => {
    const registerUserSchema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string()
            .required()
            .empty()
            .min(8)
            .max(30)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
            )
            .messages({
                "string.base": "Please enter a valid password",
                "any.required": "Password is required",
                "string.empty": "Password must not be empty",
                "string.min": "Password must be at least 8 characters long",
                "string.max": "Password must be at most 30 characters long",
                "string.pattern.base":
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)",
            }),
    });

    const { error, value } = registerUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    try {
        const result = await User.findOne({
            email: value.email,
        });

        if (result)
            return res.status(404).json({ message: "email already exists" });

        const databaseHash = await Bcrypt.hash(value.password, 12);

        const data = {
            name: value.name,
            email: value.email,
            password: databaseHash,
        };

        const newUser = new User(data);

        newUser.save();

        return res.status(200).json({ message: "registered successfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
        // database error
    }
};

/**********************************************************/
/*                      Login User                        */
/**********************************************************/

const login = async (req, res) => {
    const loginUserSchema = Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": "Please enter a valid email",
            "any.required": "email is required",
            "string.empty": "email must not be empty",
            "string.pattern.base": "email must be 10 digits in size",
        }),
        password: Joi.string().required(),
    });

    const { error, value } = loginUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    try {
        const result = await User.findOne({
            email: value.email,
        });

        if (!result)
            return res.status(404).json({
                message: "A user doesn't exists with the given email",
            });

        const databaseHash = result.password;

        const compareResult = await Bcrypt.compare(
            value.password,
            databaseHash
        );

        if (compareResult) {
            const data = {
                id: result._id,
                name: result.name,
                email: result.email,
                role: "customer",
            };

            const token = Jwt.sign(data, "secret", {
                expiresIn: "1h",
            });
            res.status(200).json({ message: "logged in", token: token });
        } else {
            res.status(401).json({ message: "password is invalid" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
        // database error
    }
};

/**********************************************************/
/*                      Get all users                     */
/**********************************************************/

const get = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    name: 1,
                    email: 1,
                    avatar: { $concat: [url, "/public/img/", "$avatar"] },
                },
            },
        ]);

        res.json(users);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

/**********************************************************/
/*                      Create User                       */
/**********************************************************/

const create = async (req, res) => {
    const loginUserSchema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string()
            .required()
            .empty()
            .min(8)
            .max(30)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
            )
            .messages({
                "string.base": "Please enter a valid password",
                "any.required": "Password is required",
                "string.empty": "Password must not be empty",
                "string.min": "Password must be at least 8 characters long",
                "string.max": "Password must be at most 30 characters long",
                "string.pattern.base":
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)",
            }),
    });

    const { error, value } = loginUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    try {
        const result = await User.findOne({ email: value.email });
        if (result) {
            return res.status(400).json({ message: "Email    already exists" });
        }

        const databaseHash = await Bcrypt.hash(value.password, 12);

        const newUser = new User({
            email: value.email,
            password: databaseHash,
        });

        await newUser.save();

        res.status(200).json({ message: "user added successfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

/**********************************************************/
/*                      Update User                       */
/**********************************************************/

const update = async (req, res) => {
    const createUserSchema = Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": "Please enter a valid email",
            "any.required": "Email is required",
            "string.empty": "Email must not be empty",
        }),
        password: Joi.string()
            .allow("")
            .min(8)
            .max(30)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
            )
            .messages({
                "string.base": "Please enter a valid password",
                "string.empty": "Password must not be empty",
                "string.min": "Password must be at least 8 characters long",
                "string.max": "Password must be at most 30 characters long",
                "string.pattern.base":
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)",
            }),

        id: Joi.string(),
    });

    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    let updateData = {
        email: value.email,
    };

    const password = value.password;

    if (password && password !== "") {
        const hashedPassword = await Bcrypt.hash(password, 12);

        if (!hashedPassword) {
            return res.status(500).json({ message: "server error" });
        }

        updateData.password = hashedPassword;
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: value.id },
            { $set: updateData }
        );

        return res.status(200).json({ message: "user updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
};

/**********************************************************/
/*                      Delete User                       */
/**********************************************************/

const drop = async (req, res) => {
    const dropUserSchema = Joi.object({
        id: Joi.string().required(),
    });

    const { error, value } = dropUserSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    try {
        const user = await User.findOne({ _id: value.id });

        if (user) {
            const result = await User.deleteOne({ _id: value.id });

            return res
                .status(200)
                .json({ message: "user deleted successfully" });
        }
    } catch (e) {
        return res.status(500).json({ message: "server error" });
    }
};

module.exports = {
    login,
    register,
    get,
    create,
    update,
    drop,
};
