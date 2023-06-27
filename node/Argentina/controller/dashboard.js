const DashBoardDB = require('../models/dashBoard')
const UserDB = require('../models/user');
const { MongoClient, ObjectId } = require('mongodb');

exports.getAllTransition = async (req, res) => {

    if (req.body.userId) {
        try {
            const {userId} = req.body
            const portFolio = await UserDB.findOne({ userId })
            const portFolioIds = portFolio.portfolios.map((item) => ObjectId(item));
            const transitions = await DashBoardDB.find({
                "_id": { $in: portFolioIds }
            })
            resData = {
                transitions,
                status: { statusCode: 200, msg: `transition fetch successfull` }
            }
            return res.json(resData)

        } catch (error) {
            console.log("error : ", error);
        }
        res.status(400).json({ error: "please send valid id" });
    }

}