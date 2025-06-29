const Device = require('../models/Device');

// GET device by barcode
async function getDeviceByBarcode(req, res) {
    try {
        const barcode = req.params.barcode;
        const dev = await Device.findOne({ Barcode: barcode });

        if (dev) {
            const device = [
                dev.srno, dev.Barcode, dev.SerialNo, dev.ModelNo, dev.TypeOfDevice,
                dev.Brand, dev.AssignedTo, dev.LocationType, dev.Date,
                dev.DeviceStatus, dev.OutLocation
            ];
            return res.json({ found: true, data: device });
        } else {
            return res.json({ found: false });
        }
    } catch (err) {
        console.error("Error fetching device:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// GET all devices
async function getAllDevices(req, res) {
    try {
        const devices = await Device.find();
        const rows = devices.map(dev => ([
            dev.srno, dev.Barcode, dev.SerialNo, dev.ModelNo, dev.TypeOfDevice,
            dev.Brand, dev.AssignedTo, dev.LocationType, dev.Date,
            dev.DeviceStatus, dev.OutLocation
        ]));

        return res.json({ data: rows });
    } catch (err) {
        console.error("Error fetching devices:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// POST new device registration
async function registerDevice(req, res) {
    try {
        const {
            Barcode, SerialNo, ModelNo, TypeOfDevice,
            Brand, AssignedTo, LocationType, DeviceStatus, OutLocation
        } = req.body;

        const date = new Date().toISOString().split('T')[0];
        const total = await Device.countDocuments();
        const srno = total + 1;

        const newDevice = new Device({
            srno,
            Barcode,
            SerialNo,
            ModelNo,
            TypeOfDevice,
            Brand,
            AssignedTo,
            LocationType,
            Date: date,
            DeviceStatus,
            OutLocation
        });

        await newDevice.save();
        res.json({ success: true, srno });
    } catch (err) {
        console.error("Error registering device:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {
    getAllDevices,
    registerDevice,
    getDeviceByBarcode
};






























// ---------------------------------
// //apis
// app.get('/api/device/:barcode', async (req, res) => {
//   const barcode = req.params.barcode;
//   const auth = await loadAuthClient();
//   const sheets = google.sheets({ version: 'v4', auth });

//   const result = await sheets.spreadsheets.values.get({
//     spreadsheetId: SHEET_ID,
//     range: 'Sheet1!A2:K',
//   });

//   const rows = result.data.values || [];
//   const device = rows.find(row => row[1] === barcode);
//   if (device) {
//     return res.json({ found: true, data: device });
//   } else {
//     return res.json({ found: false });
//   }
// });

// app.get('/api/allDevices', async (req, res) => {
//   const auth = await loadAuthClient();
//   const sheets = google.sheets({ version: 'v4', auth });

//   const result = await sheets.spreadsheets.values.get({
//     spreadsheetId: SHEET_ID,
//     range: 'Sheet1!A2:K'
//   });

//   const rows = result.data.values || [];
//   // console.log(rows);
//   return res.json({
//     data: rows
//   });
// });


// app.post('/api/register', async (req, res) => {

//   const { Barcode, SerialNo, ModelNo, TypeOfDevice, Brand, AssignedTo, LocationType, DeviceStatus, OutLocation } = req.body;

//   const date = new Date().toISOString().split('T')[0];
//   const auth = await loadAuthClient();
//   const sheets = google.sheets({ version: 'v4', auth });

//   const result = await sheets.spreadsheets.values.get({
//     spreadsheetId: SHEET_ID,
//     range: 'Sheet1!A2:A',
//   });

//   const srno = (result.data.values?.length || 0) + 1;

//   await sheets.spreadsheets.values.append({
//     spreadsheetId: SHEET_ID,
//     range: 'Sheet1!A:K',
//     valueInputOption: 'USER_ENTERED',
//     resource: {
//       values: [[
//         srno, Barcode, SerialNo, ModelNo, TypeOfDevice, Brand, AssignedTo, LocationType, date, DeviceStatus, OutLocation
//       ]]
//     }
//   });

//   res.json({ success: true, srno });
// });

