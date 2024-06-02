import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register the necessary Chart.js components
ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AlertsOverTime = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('/eve.json')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const timeCounts = data.reduce((acc, row) => {
            const timestamp = new Date(row.timestamp).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
            acc[timestamp] = (acc[timestamp] || 0) + 1;
            return acc;
          }, {});

          const times = Object.keys(timeCounts).sort(); // Ensure times are sorted
          const counts = Object.values(timeCounts);

          setChartData({
            labels: times,
            datasets: [
              {
                label: 'Alerts Over Time',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: true,
              },
            ],
          });
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Alerts Over Time</h2>
      {chartData ? (
        <div>
          <Line
            data={chartData}
            options={{
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day', // Adjust the unit as necessary
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    title: (tooltipItems) => {
                      return `Date: ${tooltipItems[0].label}`;
                    },
                    label: (tooltipItem) => {
                      return `Alerts: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
            }}
          />
          <p style={styles.text}>
            This chart displays the number of alerts over time. 
            Analyzing trends in alert frequency can provide valuable insights into network security. 
            By monitoring the alerts, we can identify potential security breaches and take preventive measures.
          </p>
          
        </div>
      ) : (
        <p style={styles.loading}>Loading chart...</p>
      )}
    </div>
  );
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
};

export default AlertsOverTime;
