export const setDatasets = (data?: any[]) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("Data is not valid:", data);
        return [];
    }
    
    const datasets = data
        .filter(row => row && row.alert) // Filter out rows without an alert field
        .map((row) => {
            // Process the row and return the dataset entry
            return {
                x: row.timestamp,
                y: row.alert.severity,
                // Add other relevant fields
            };
        });
    
    return datasets;
};
