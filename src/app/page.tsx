"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import axios from 'axios'; 

const ManageDevicesPage: React.FC = () => {
  
  const router = useRouter();
  const [devices, setDevices] = useState([]);
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    fetchDevices(); 
  }, []); 

const fetchDevices = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:3001/api/user/userByToken', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setDevices(response.data.data.loginHistory);
    } catch (error) {
      console.error('Error fetching devices data:', error);
    }
};

    const handleLogout = () => {
      localStorage.removeItem('userToken');
      router.push('/signin');
    };

    const handleSignOutLoginHistoryId = async (loginHistoryId: string) => {
      try {
          const userToken = localStorage.getItem('userToken');
          if (!userToken || !loginHistoryId) {
              console.error('User token or loginHistoryId not found');
              return;
          }

          const response = await axios.delete(`http://localhost:3001/api/user/logout/${loginHistoryId}`, {
              headers: {
                  Authorization: `Bearer ${userToken}`,
              },
          });

          if (response.status === 200) {
            fetchDevices(); 
        } else {
            console.error('Logout failed');
        }
      } catch (error) {
          console.error('Logout failed', error);
      }
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mt-8 text-right">
        <Link href={"/signin"}>
          <h3>To manage your devices sign in:</h3>
          <Button className='border-zinc-850 text-zinc-300 hover:border-zinc-200 hover:text-zinc-100 transition-colors border  px-8'>Sign In</Button>
        </Link>
      {isLoggedIn && (
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Manage Devices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {devices.map((device) => (
          <div key={device._id} className="border border-gray-300 rounded-md p-4 flex flex-col bg-gray-100">
            <h2 className="text-lg font-semibold mb-2">{device.browser}</h2>
            <p className="text-sm mb-2">
              Last Login: {new Date(device.loginTime).toLocaleString()}
            </p>
            <p className="text-sm">
              Status:   
              <button className="text-sm font-semibold text-blue-600 hover:underline" onClick={() => handleSignOutLoginHistoryId(device._id)}>
                Logout
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDevicesPage;
