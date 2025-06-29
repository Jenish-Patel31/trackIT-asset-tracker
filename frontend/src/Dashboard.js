/* global $, DataTable */
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [assets, setAssets] = useState([]);
    // const [search, setSearch] = useState('');
    const tableRef = useRef(null);

    useEffect(() => {
        axios.get('https://trackit-asset-tracker.onrender.com/api/devices/allDevices')
            .then((res) => {
                if (Array.isArray(res.data?.data)) {
                    setAssets(res.data.data);
                } else {
                    console.error("Unexpected response:", res.data);
                    alert('No valid data received');
                }
            })
            .catch(() => alert('Failed to load assets'));
    }, []);

    // Initialize DataTable after data is loaded
    useEffect(() => {
        if (assets.length > 0) {
            setTimeout(() => {
                // Avoid re-initialization
                if ($.fn.DataTable.isDataTable('#myTable')) {
                    $('#myTable').DataTable().destroy();
                }

                new DataTable('#myTable');
            }, 100); // small delay to ensure DOM is ready
        }
    }, [assets]);

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white shadow rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <img src="trackFevi.png" alt="📊" className="w-9" />
                Device Dashboard
            </h2>

            <div className="overflow-x-auto">
                <table id="myTable" ref={tableRef} className="display w-full text-sm">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Barcode</th>
                            <th>SerialNo</th>
                            <th>ModelNo</th>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Assigned To</th>
                            <th>Location</th>
                            <th>Updated Date</th>
                            <th>Device Status</th>
                            <th>OutLocation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(Array.isArray(assets) ? assets : []).map((row, i) => (
                            <tr key={i}>
                                {row.map((cell, j) => (
                                    <td key={j}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
