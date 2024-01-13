const { response } = require('express');
const Service = require('../models/service.model');


const service = async (request, response) => {
    try {
        const serviceData = await Service.find();
        if (!serviceData) {
            response.status(200).json({ "message": "Data not found" });
            return;
        }
        response.status(200).json({ "success": true, "ServiceData": serviceData });
    } catch (error) {
        console.log(error);
    }
    

}

module.exports = { service };