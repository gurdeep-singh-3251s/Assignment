import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

const AlertDetails = () => {
    const location = useLocation();
    const { data } = location.state;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.container}
        >
            <motion.h1
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={styles.header}
            >
                Alert Details
            </motion.h1>
            <motion.p
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={styles.description}
            >
                Detailed analysis of alerts generated by the IDS. Use the various visualizations to delve deeper into the specifics of each alert.
            </motion.p>
            <div style={styles.graphContainer}>
                <Bar data={data} />
            </div>
        </motion.div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#121212',
        color: '#ffffff',
        minHeight: '100vh',
    },
    header: {
        marginBottom: '10px',
        color: '#ffffff',
    },
    description: {
        marginBottom: '20px',
        fontSize: '16px',
        textAlign: 'center',
        maxWidth: '800px',
    },
    graphContainer: {
        width: '80%',
        maxWidth: '800px',
        marginBottom: '20px',
    },
};

export default AlertDetails;