const User = require("../models/user");
const Admin = require("../models/admin");
const Event = require("../models/event");

/**********************************************************/
/*                      Get all counts                    */
/**********************************************************/

const getCounts = async (req, res) => {
    const result = {
        userCount: 1,
        adminCount: 1,
        productCount: 1,
        categorycount: 1,
        dueOrderCount: 1,
        completedOrderCount: 1,
    };

    return res.status(200).json(result);

    // try {
    //     // const userCount = User.countDocuments();
    //     // const adminCount = Admin.countDocuments();
    //     // const productCount = Event.countDocuments();
    //     // const categorycount = User.countDocuments();
    //     // const dueOrderCount = Order.countDocuments({ status: "created" });
    //     // const completedOrderCount = Order.countDocuments({ status: "created" });

    //     Promise.all([
    //         userCount,
    //         adminCount,
    //         productCount,
    //         categorycount,
    //         dueOrderCount,
    //         completedOrderCount,
    //     ])
    //         .then((counts) => {
    //             console.log(counts);

    //             const result = {
    //                 userCount: counts[0],
    //                 adminCount: counts[1],
    //                 productCount: counts[2],
    //                 categorycount: counts[3],
    //                 dueOrderCount: counts[4],
    //                 completedOrderCount: counts[5],
    //             };

    //             return res.status(200).json(result);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // } catch (e) {
    //     console.log(e);
    //     return res.status(500).json({ message: "server error" });
    // }
};

module.exports = {
    getCounts,
};
