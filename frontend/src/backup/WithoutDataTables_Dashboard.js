import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState(null); // index of column
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:4000/api/allDevices')
      .then((res) => {
        setAssets(res.data.data);
      }).catch(() => alert('Failed to load assets'));
  }, []);

  // Filter based on search
  const filtered = assets.filter(row =>
    row[1]?.toLowerCase().includes(search.toLowerCase()) || // Barcode
    row[2]?.toLowerCase().includes(search.toLowerCase()) || // Serial No
    row[4]?.toLowerCase().includes(search.toLowerCase()) || // Brand
    row[5]?.toLowerCase().includes(search.toLowerCase())    // Assigned To
  );

  // Sort rows if sortField is selected
  const sorted = [...filtered].sort((a, b) => {
    if (sortField === null) return 0;
    const valA = a[sortField]?.toLowerCase() || '';
    const valB = b[sortField]?.toLowerCase() || '';
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (fieldIndex) => {
    if (sortField === fieldIndex) {
      // toggle direction
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(fieldIndex);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (index) => {
    if (sortField !== index) return '⇅';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <img src="aivid_dash.jpeg" alt="📊" className="w-10" />
        Device Dashboard
      </h2>

      <input
        placeholder="Search by Barcode, Serial No, or brand..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
      />

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-2 py-1">Sr No</th>
              <th
                className="border px-2 py-1 cursor-pointer"
                onClick={() => handleSort(1)}
              >
                Barcode {renderSortIcon(1)}
              </th>
              <th className="border px-2 py-1">SerialNo</th>
              <th className="border px-2 py-1">ModelNo</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Brand</th>
              <th
                className="border px-2 py-1 cursor-pointer"
                onClick={() => handleSort(6)}
              >
                Assigned To {renderSortIcon(6)}
              </th>
              <th className="border px-2 py-1">Location</th>
              <th className="border px-2 py-1">Updated Date</th>
              <th className="border px-2 py-1">Device Status</th>
              <th className="border px-2 py-1">OutLocation</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((row, i) => (
              <tr key={i} className="text-center hover:bg-gray-50">
                {row.map((cell, j) => (
                  <td key={j} className="border px-2 py-1">{cell}</td>
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
