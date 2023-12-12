// api/fetchData.js
module.exports = async (req, res) => {
    const response = await fetch('YOUR_API_ENDPOINT', {
        headers: {
            'Authorization': `Bearer ${process.env.YOUR_API_KEY}`
        }
    });
    const data = await response.json();
    res.status(200).json(data);
};
