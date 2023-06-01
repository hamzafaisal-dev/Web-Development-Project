import { verifyAccessToken } from '../helpers/authHelpers.js';
import models from '../models/allModels.js'
import pkg from 'mongoose';
const { MongooseError } = pkg;
const { City } = models;

export async function addCity(req, res, next) {
    try {

        const city = await City.create(req.body);
        await city.save();
        res.status(200).json({ message: 'City added successfully' });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(500).json({ message: 'This city has already been added' })
        }

        res.status(500).json({ message: 'Unable to add city' })
    }
}

export async function getCity(req, res, next) {
    try {
        const city = await City.findById(req.params.id);

        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export async function getAllCities(req, res, next) {
    try {
        const cities = await City.find({});
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export async function deleteCity(req, res, next) {
    try {
        const cityID = req.params.id;
        const deletedCity = await City.findByIdAndDelete(cityID);

        if (!deletedCity) {
            return res.status(400).json({ message: `City not found` });
        }

        else {
            res.status(200).json({ message: `City deleted successfully` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}