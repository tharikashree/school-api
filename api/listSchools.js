import mysql from 'mysql';
import db from '../db.js';

const listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

        // Query to fetch all schools
        const query = 'SELECT id, name, address, latitude, longitude FROM schools';

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching schools: ', err);
                return res.status(500).json({ error: 'Error fetching schools' });
            }

            // Calculate the distance between user's location and each school
            const schools = results.map((school) => {
                const distance = getDistance(latitude, longitude, school.latitude, school.longitude);
                return { ...school, distance };
            });

            // Sort schools by distance
            schools.sort((a, b) => a.distance - b.distance);

            // Send the response
            res.json(schools);

        });
    // Close the connection after query execution
    db.end();
};

// Function to calculate distance between two points (Haversine formula)
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
};

export default listSchools;