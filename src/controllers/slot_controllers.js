import models from '../models/allModels.js'
const { City, Area, Ground, Slot } = models;

// /cities/:cityID/areas/:areaID/grounds/:groundID/slots
export async function addSlot(req, res, next) {
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

        // check if slot with given start and end times already exists in ground's "slots" array, return error if true
        for (let slot of ground.slots) {
            if (slot.startTime === req.body.startTime && slot.endTime === req.body.endTime) {
                return res.status(400).json({ message: 'This slot already exists in this ground' })
            }
        }

        // check db for slot with given start and end times
        const slot = await Slot.findOne({ startTime: req.body.startTime, endTime: req.body.endTime });

        // if no such slot exists, create one in db and push it's ID to slots array, else simply push the slot's ID to the array
        if (!slot) {
            const newSlot = await Slot.create(req.body);
            ground.slots.push(newSlot._id);
            ground.save();
        } else {
            ground.slots.push(slot._id);
            ground.save();
        }

        res.status(201).json({ message: 'Slot created successfully', ground })

    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' && error.errors.rate) {
            return res.status(400).json({ message: 'Enter rate value' })
        }

        if (error.name === 'ValidationError' && (error.errors.endTime || error.errors.startTime)) {
            return res.status(400).json({ message: 'Invalid slot' })
        }

        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID/slots
export async function getSlots(req, res, next) {
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

        const slots = ground.slots;

        res.status(200).json({ slots });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID
export async function updateSlot(req, res, next) {
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

        // check if slot with given start and end times already exists in ground's "slots" array, return error if true
        for (let slot of ground.slots) {
            if (slot.startTime === req.body.startTime && slot.endTime === req.body.endTime) {
                return res.status(400).json({ message: 'This slot already exists in this ground' })
            }
        }

        // update slot
        const slot = await Slot.findByIdAndUpdate(req.params.slotID, req.body, { new: true, runValidators: true });

        if (!slot) {
            return res.status(404).json({ message: "Slot not found" });
        }

        res.status(200).json({ message: 'Slot details updated successfully', slot });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// /cities/:cityID/areas/:areaID/grounds/:groundID/slots/:slotID
export async function deleteSlot(req, res, next) {
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
        const ground = await Ground.findById(groundID);

        if (!ground) {
            return res.status(404).json({ message: "Ground not found" });
        }

        // find index of slot to be deleted
        const deletedIndex = ground.slots.indexOf(req.params.slotID);

        if (deletedIndex > -1) { // only splice array when item found 
            ground.slots.splice(deletedIndex); // remove slot from ground
            await ground.save();
            return res.status(200).json({ message: 'Slot deleted successully', ground });
        } else {
            return res.status(404).json({ message: 'Slot not found in this ground' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}