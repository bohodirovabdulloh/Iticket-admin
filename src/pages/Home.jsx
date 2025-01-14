import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBullhorn } from "react-icons/fa";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import Loading from "../components/Loading";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const [advertising, setAdvertising] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    requestAdvertising();
  }, []);

  const requestAdvertising = async () => {
    try {
      const response = await fetch("https://bakend-wtc.onrender.com/api/v1/banners");
      const ads = await response.json();
      setAdvertising(ads.data || []);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching advertising: ", e);
      setLoading(false);
    }
  };

  const totalItems = advertising.length;

  const doughnutData = {
    labels: ['Advertising'],
    datasets: [
      {
        label: 'Distribution',
        data: [advertising.length],
        backgroundColor: ['#FF6384'],
        hoverBackgroundColor: ['#FF6384'],
        borderWidth: 1,
        cutout: '75%',
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const barData = {
    labels: ['Advertising'],
    datasets: [
      {
        label: 'Advertising Count',
        data: [advertising.length],
        backgroundColor: ['#4A90E2'],
        hoverBackgroundColor: ['#357ABD'],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Advertising: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Performance',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        borderColor: '#4A90E2',
        backgroundColor: '#4A90E2',
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="w-full h-full text-black p-6">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => handleNavigate('/app/advertising')}
            >
              <div className="flex justify-between items-center">
                <FaBullhorn size={30} />
                <div className="text-right">
                  <p className="text-3xl font-bold">{advertising.length}</p>
                  <p className="text-sm">Active Advertising</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-4">Data Distribution</h2>
              <div className="relative w-[400px] h-[400px]">
                <Doughnut data={doughnutData} options={doughnutOptions} />
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <p className="text-xl font-bold">Total Items</p>
                  <p className="text-2xl">{totalItems}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">Advertising Count</h2>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-6">{advertising.length}</h1>
              <div className="w-full">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>

          
        </>
      )}
    </div>
  );
};

export default Dashboard;
