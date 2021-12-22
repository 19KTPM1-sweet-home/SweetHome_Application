const scheduleModel = require('../models/Schedule');
const userModel = require('../models/User');
const moment = require('moment');

module.exports.requestTour = (userId, requestTour) => {
    return new Promise((resolve, reject) => {
        if(requestTour) {
            const newSchedule = {
              fullName: requestTour.fullName,
              email: requestTour.email,
              phoneNumber: requestTour.phoneNumber,
              propertyId: requestTour.propertyId,
              ack: requestTour.ack,
              appointmentDate: requestTour.appointmentDate
            };

            if(requestTour.message)
                newSchedule['message'] = requestTour.message;

            const newScheduleModel = new scheduleModel(newSchedule);

            newScheduleModel.save(async (err, savedDoc) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                await userModel.findOneAndUpdate(
                    { _id: userId }, 
                    { $push: { schedule: savedDoc._id} }, 
                    {upsert: true}
                );
                resolve(moment(savedDoc.appointmentDate).format('DD/MM/YYYY hh:mm A'));
                // saved!
            });
        } 
    });
}