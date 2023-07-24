const Joi = require("joi");
const Event = require("../models/event");
const String = require("../helpers/string");

/**********************************************************/
/*                      Get Events                        */
/**********************************************************/
const get = async (req, res) => {
    try {
        const event = await Event.find(
            {},
            {
                _id: 0,
                id: "$_id",
                title: 1,
                code: 1,
            }
        );

        res.json(event);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

/**********************************************************/
/*                   Create Event                      */
/**********************************************************/

const create = async (req, res) => {
    const updateEventSchema = Joi.object({
        title: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid title",
            "any.required": "title is required",
            "string.empty": "title must not be empty",
        }),
    });

    const { error, value } = updateEventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    try {
        const newEvent = new Event({
            title: value.title,
            code: String.randomOtp(6),
        });

        await newEvent.save();

        res.status(200).json({
            message: "Event added successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "server error" });
        // database error
    }
};

/**********************************************************/
/*                   Update Event                      */
/**********************************************************/

const update = async (req, res) => {
    const updateEventSchema = Joi.object({
        id: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid id",
            "any.required": "id is required",
            "string.empty": "id must not be empty",
        }),
        title: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid title",
            "any.required": "title is required",
            "string.empty": "title must not be empty",
        }),
    });

    const { error, value } = updateEventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const newData = { title: value.title };

    const id = value.id;

    try {
        const result = await Event.findOneAndUpdate(
            { _id: id },
            { $set: newData }
        );

        return res.status(200).json({ message: "Event updated succesfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
        // database error
    }
};

/**********************************************************/
/*                   Delete Event                      */
/**********************************************************/

const drop = async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findOne({ _id: id });

        if (event) {
            const result = await Event.deleteOne({ _id: id });

            return res
                .status(200)
                .json({ message: "Event deleted successfully" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

module.exports = {
    get,
    create,
    update,
    drop,
};
