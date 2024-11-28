import db  from '../db.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, address, latitude, longitude } = req.body;

        // Validate input
        if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ message: 'Invalid or missing fields' });
        }

        try {
            

            // Insert query
            const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
            db.query(query, [name, address, latitude, longitude], (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                res.status(201).json({ message: 'School added successfully!' });
            });

            // Close the connection
            db.end();
        } catch (error) {
            console.error('Error adding school:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
