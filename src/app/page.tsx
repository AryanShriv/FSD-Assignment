import React from 'react';
import Link from 'next/link'

const ManageDevicesPage: React.FC = () => {
  // Sample data for demonstration
  const devices = [
    { id: 1, name: 'Device 1', lastLogin: '2024-04-30 08:30:00', isLoggedIn: true },
    { id: 2, name: 'Device 2', lastLogin: '2024-04-29 15:45:00', isLoggedIn: false },
    { id: 3, name: 'Device 3', lastLogin: '2024-04-28 21:10:00', isLoggedIn: false },
    // Add more sample data as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Manage Devices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {devices.map((device) => (
          <div key={device.id} className="border border-gray-300 rounded-md p-4 flex flex-col bg-gray-100">
            <h2 className="text-lg font-semibold mb-2">{device.name}</h2>
            <p className="text-sm mb-2">
              Last Login: {new Date(device.lastLogin).toLocaleString()}
            </p>
            <p className="text-sm">
              Status: {device.isLoggedIn ? 'Logged In' : 'Logged Out'}
            </p>
            {/* Placeholder buttons for actions */}
            <div className="mt-auto pt-4 border-t border-gray-300">
              <button className="text-sm font-semibold text-blue-600 hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDevicesPage;
