import models from '../models/allModels.js'
const { City, Area, Ground, Review } = models;
import { verifyToken } from '../helpers/authHelpers.js';

// /cities/:cityID/areas/:areaID/grounds/:groundID/reviews
export async function addReview(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const areaID = req.params.areaID;

        // check if area ID request parameter is valid
        const area = await Area.findById(areaID);

        if (!area) {
            return res.status(404).json({ message: "Area not found" });
        }

        const groundID = req.params.groundID;

        // check if ground ID request parameter is valid
        const ground = await Ground.findById(groundID).populate('slots');

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }
    } catch (error) {

    }
}