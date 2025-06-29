const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  srno: Number,
  Barcode: String,
  SerialNo: String,
  ModelNo: String,
  TypeOfDevice: String,
  Brand: String,
  AssignedTo: String,
  LocationType: String,
  Date: String,
  DeviceStatus: String,
  OutLocation: String
});

module.exports = mongoose.model('Device', deviceSchema);
