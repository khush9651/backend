const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        // Validate input
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));

        // Determine highest alphabet (case insensitive)
        let highestAlphabet = [];
        if (alphabets.length > 0) {
            highestAlphabet = [alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).pop()];
        }

        res.status(200).json({
            is_success: true,
            user_id: "khush9651",
            email: "22BCS15103@cuchd.in",
            roll_number: "22BCS15103",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server Error" });
    }
});

// Start server (for local testing)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
