import { useRef, useState } from 'react';
import axios from 'axios';

function AssetTracker() {
  const [barcode, setBarcode] = useState('');
  const [deviceData, setDeviceData] = useState(null);
  const [formData, setFormData] = useState({
    SerialNo: '',
    ModelNo:'',
    TypeOfDevice: '',
    Brand: '',
    AssignedTo: '',
    LocationType: '',
    DeviceStatus:'',
    OutLocation:'',
  });

  const inputRef = useRef();

  const handleStartScan = () => {
    setBarcode('');
    setDeviceData(null);
    setFormData({
      SerialNo: '',
      ModelNo:'',
      TypeOfDevice: '',
      Brand: '',
      AssignedTo: '',
      LocationType: '',
      DeviceStatus:'',
      OutLocation:'',
    });
    inputRef.current?.focus();
  };

  const handleBarcodeSubmit = async () => {
    try {
      const res = await axios.get(`https://trackit-asset-tracker.onrender.com/api/devices/${barcode}`);
      if (res.data.found) {
        setDeviceData(res.data.data);
      } else {
        setDeviceData(null);
      }
    } catch (err) {
      alert('Error fetching device');
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('https://trackit-asset-tracker.onrender.com/api/devices/register', {
        Barcode: barcode,
        ...formData,
      });
      alert("Device registered!");
      handleStartScan();
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">

      <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <img src="/aivid.svg" alt="Company Logo" className="h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">📦 Asset Tracker</h1>

        <div className="flex justify-between mb-4">
          <button
            onClick={handleStartScan}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            Start New Scan
          </button>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleBarcodeSubmit();
          }}
          className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Scan or enter barcode..."
        />

        {/* If device is found */}
        {deviceData ? (
          <div className="bg-green-100 border border-green-300 rounded p-4">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Device Already Registered</h2>
            <div className="text-sm text-gray-800 space-y-1">
              <p><b>Barcode:</b> {deviceData[1]}</p>
              <p><b>Serial No:</b> {deviceData[2]}</p>
              <p><b>Model No :</b> {deviceData[2]}</p>
              <p><b>Type:</b> {deviceData[3]}</p>
              <p><b>Brand:</b> {deviceData[4]}</p>
              <p><b>Assigned To:</b> {deviceData[5]}</p>
              <p><b>Location:</b> {deviceData[6]}</p>
              <p><b>Updated On:</b> {deviceData[7]}</p>
              <p><b>Device Status:</b> {deviceData[8]}</p>
              <p><b>OutLocation:</b> {deviceData[9]}</p>

            </div>
          </div>
        ) : (
          barcode && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Register New Device</h2>

              {["SerialNo", "ModelNo", "TypeOfDevice", "Brand", "AssignedTo", "LocationType", "DeviceStatus","OutLocation"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              ))}

              <button
                onClick={handleRegister}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm w-full"
              >
                 Register Device
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AssetTracker;
