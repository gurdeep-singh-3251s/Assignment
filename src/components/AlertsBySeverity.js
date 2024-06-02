import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary scales and components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Utility function to process data
const setDatasets = (data) => {
  return data.map(row => ({
    y: row.alert ? row.alert.severity : null,
  }));
};

const AlertsBySeverity = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('/eve.json')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data); // Debugging log
        const processedData = setDatasets(data);

        const severityCounts = processedData.reduce((acc, row) => {
          const severity = row.y;
          if (severity !== null) {
            acc[severity] = (acc[severity] || 0) + 1;
          }
          return acc;
        }, {});

        const severities = Object.keys(severityCounts).map(Number);
        const alerts = Object.values(severityCounts);

        setChartData({
          labels: severities,
          datasets: [
            {
              label: 'Number of Alerts by Severity',
              data: alerts,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
          ],
        });
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Alerts by Severity</h2>
      {chartData ? (
        <>
          <Bar
            data={chartData}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Severity Level',
                    color: '#ffffff',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Number of Alerts',
                    color: '#ffffff',
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    color: '#ffffff',
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `Alerts: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
            }}
          />
          <p style={styles.text}>
            This bar chart displays the number of alerts categorized by their severity levels. 
            Higher severity levels indicate more critical alerts that require immediate attention. 
            By understanding the distribution of alert severities, security teams can prioritize their response efforts.
          </p>
          
        </>
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

export default AlertsBySeverity;
