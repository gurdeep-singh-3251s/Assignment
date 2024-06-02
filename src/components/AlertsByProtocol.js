import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const AlertsByProtocol = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Alerts',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/eve.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Fetched data is not an array');
        }

        const protocolCounts = data.reduce((acc, row) => {
          if (row && row.proto) {
            acc[row.proto] = (acc[row.proto] || 0) + 1;
          }
          return acc;
        }, {});

        const protocols = Object.keys(protocolCounts);
        const counts = Object.values(protocolCounts);

        setChartData({
          labels: protocols,
          datasets: [
            {
              label: 'Number of Alerts',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Alerts by Protocol</h2>
      {loading ? (
        <div style={styles.loading}>
          <p>Loading chart...</p>
        </div>
      ) : error ? (
        <div style={styles.error}>
          <p>Error: {error}</p>
        </div>
      ) : (
        <>
          <Radar data={chartData} options={chartOptions} />
          <p style={styles.text}>
            This radar chart displays the number of alerts by protocol. 
            It provides a visual representation of which network protocols are most frequently associated with alerts, 
            aiding in the identification of potentially problematic protocols.
          </p>
          
        </>
      )}
    </div>
  );
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          size: 14,
          color: '#ffffff',
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed !== null) {
            label += context.parsed;
          }
          return label;
        },
      },
    },
  },
  scales: {
    r: {
      ticks: {
        backdropColor: 'rgba(0, 0, 0, 0)',
        font: {
          size: 12,
          color: '#ffffff',
        },
      },
      pointLabels: {
        font: {
          size: 14,
          color: '#ffffff',
        },
      },
    },
  },
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#2c2c2c',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    color: '#ffffff',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '28px',
    color: '#ffffff',
  },
  text: {
    margin: '20px 0',
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#dddddd',
  },
  link: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#ffffff',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'red',
  },
};

export default AlertsByProtocol;
