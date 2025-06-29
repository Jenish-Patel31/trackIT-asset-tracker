const express = require('express');
const router = express.Router();
const {
    getDeviceByBarcode,
    getAllDevices,
    registerDevice
} = require('../controllers/deviceController');


router.get('/:barcode', getDeviceByBarcode);
router.get('/allDevices', getAllDevices);
router.post('/register', registerDevice);


module.exports = router;