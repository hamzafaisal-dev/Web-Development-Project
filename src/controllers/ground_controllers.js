import models from '../models/allModels.js'
const { City, Area, Ground } = models;

// /cities/:cityID/grounds
export async function addGround(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        // const areaID = req.params.areaID;

        // // check if area ID request parameter is valid
        // const area = await Area.findById(areaID);

        // if (!area) {
        //     return res.status(404).json({ message: "Area not found" });
        // }

        let ground = await Ground.findOne({ groundName: req.body.groundName });

        // if ground does not exist in database, create it
        if (!ground) {
            ground = await Ground.create(req.body)
            ground.save();
        }

        // if city already contains ground, return error message
        if (city.grounds.includes(ground._id)) {
            return res.status(400).json({ message: "Ground already exists in this city" });
        }

        // else push ground ID to city and save
        city.grounds.push(ground._id);
        city.save();

        res.status(201).json({ message: 'Ground created successfully', ground })

    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' && error.errors.groundName) {
            return res.status(400).json({ message: 'Enter ground name' })
        }

        if (error.name === 'ValidationError' && error.errors.address) {
            return res.status(400).json({ message: 'Enter ground address' })
        }

        if (error.name === 'MongooseError' && error.code === 11000) {
            return res.status(400).json({ message: 'This ground already exists in the system' })
        }

        res.status(500).json({ error });
    }
}

export async function getAllGrounds(req, res, next) {
    try {

        const grounds = await Ground.find({});

        res.status(200).json(grounds)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/grounds
export async function viewGrounds(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID).populate('grounds');

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        let grounds = [];

        for (let ground of city.grounds) {
            // if no area given but type given and type matches any type in array, push it
            if (req.body.area == undefined && req.body.type != undefined && ground.type == req.body.type) {
                grounds.push(ground);
            }

            // if no type given but area given and area matches any area in array, push it
            else if (req.body.area != undefined && req.body.type == undefined && ground.area == req.body.area) {
                grounds.push(ground);
            }

            // if both type and area given, and both type and area match any ground, push it
            else if (req.body.area != undefined && req.body.type != undefined && (ground.area == req.body.area && ground.type == req.body.type)) {
                grounds.push(ground);
            }

            else if (req.body.area == undefined && req.body.type == undefined) {
                grounds = city.grounds;
            }
        }

        res.status(200).json(grounds)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// view particular ground by name (regex not working properly)
export async function viewGround(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID);

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const ground = await Ground.findById(req.params.groundID);

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        res.status(200).json(ground)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID
export async function updateGround(req, res, next) {
    try {
        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID).populate('grounds');

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        const ground = await Ground.findByIdAndUpdate(req.params.groundID, req.body, { new: true });

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        res.status(200).json({ message: 'Ground details updated successfully', ground });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export async function deleteGround(req, res, next) {
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

        // find index of area to be deleted
        const deletedIndex = area.grounds.indexOf(req.params.groundID);

        if (deletedIndex > -1) { // only splice array when item found 
            area.grounds.splice(deletedIndex); // remove area from city
            await area.save();
            return res.status(200).json({ message: 'Ground deleted successully', area });
        }

        else {
            return res.status(404).json({ message: 'Ground not found in this area' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/grounds
export async function filterGrounds(req, res, next) {
    try {

        const cityID = req.params.cityID;

        // check if city ID request parameter is valid
        const city = await City.findById(cityID).populate('grounds');

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }

        // const grounds = await Ground.find(req.body);

        // return res.status(200).json(grounds)

        return console.log(city.grounds);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

