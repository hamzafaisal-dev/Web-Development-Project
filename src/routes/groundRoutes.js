import express from 'express'
const groundRouter = express.Router();
import { addGround, viewGrounds, viewGround, filterGrounds, updateGround, deleteGround, getAllGrounds } from "../controllers/ground_controllers.js"

// CREATE new ground in a particular area
groundRouter.post('/cities/:cityID/grounds', addGround);

// GET all grounds
groundRouter.get('/grounds', getAllGrounds);

// GET all grounds in a particular area
// groundRouter.get('/cities/:cityID/areas/:areaID/grounds', viewGrounds);

// GET particular ground in a particular area. Search by name
groundRouter.get('/cities/:cityID/all-grounds/:groundID', viewGround);

// get all grounds / filter grounds
groundRouter.post('/cities/:cityID/all-grounds', viewGrounds);

// UPDATE a particular ground
groundRouter.put('/cities/:cityID/all-grounds/:groundID', updateGround);

// DELETE a particular ground
groundRouter.delete('/cities/:cityID/grounds/:groundID', deleteGround);

export { groundRouter }