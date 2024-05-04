import React from 'react';
import Link from 'next/link';

const AdminPage: React.FC = () => {
    // Sample user data for demonstration
    const users = [
        { id: 1, name: 'User 1', role: 'Admin', lastLogin: '2024-04-30 08:30:00' },
        { id: 2, name: 'User 2', role: 'User', lastLogin: '2024-04-29 15:45:00' },
        { id: 3, name: 'User 3', role: 'User', lastLogin: '2024-04-28 21:10:00' },
        // Add more sample data as needed
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Panel</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {users.map((user) => (
                    <div key={user.id} className="rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                            <p className="text-sm text-gray-600">Role: {user.role}</p>
                            <p className="text-sm text-gray-600">Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
                        </div>
                        {/* Placeholder buttons for actions */}
                        <div className="p-4 flex justify-end border-t border-gray-200 bg-gray-50">
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

export default AdminPage;
