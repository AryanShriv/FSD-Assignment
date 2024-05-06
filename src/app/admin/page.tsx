"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const AdminPage: React.FC = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/admin/user', {});

            setUsers(response.data.data);
            console.log(response.data.data, "iser")
        } catch (error) {
            console.error('Error fetching devices data:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Panel</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {users.map((user) => (
                    <div key={user.id} className="rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-900">{user.fullName}</h2>
                            <p className="text-sm text-gray-600 mb-4">Email: {user.email}</p>
                            {user.loginHistory.length > 0 && (
                                <div>
                                    {user.loginHistory.map((login) => (
                                        <p key={login._id} className="text-sm text-gray-600 mt-4">
                                            <p>Login: {new Date(login.loginTime).toLocaleString()}</p>
                                            <p>Device: {login.browser}</p>
                                            <br/>
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
