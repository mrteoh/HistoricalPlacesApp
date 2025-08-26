const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Historical Places Data
const historicalPlaces = [
    {
        "name": "A Famosa",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "A Famosa is a Portuguese fortress located in Malacca, built in 1511. It is among the oldest surviving European architectural remains in Asia."
    },
    {
        "name": "St. Paul’s Hill (Bukit St. Paul)",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "St. Paul’s Hill in Malacca features the ruins of St. Paul’s Church, originally built by the Portuguese in 1521."
    },
    {
        "name": "Kellie’s Castle",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "Located in Batu Gajah, Perak, Kellie’s Castle is an unfinished mansion built by Scottish planter William Kellie Smith in the early 20th century."
    },
    {
        "name": "Sultan Abdul Samad Building",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "An iconic landmark in Kuala Lumpur, built in 1897 during British rule, showcasing Indo-Saracenic architecture."
    },
    {
        "name": "Christ Church Melaka",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "Built in 1753 by the Dutch, Christ Church is one of the oldest functioning Protestant churches in Malaysia."
    },
    {
        "name": "The Stadthuys",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "Constructed in 1650 by the Dutch, the Stadthuys served as the administrative center of Malacca."
    },
    {
        "name": "Fort Cornwallis",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "An 18th-century star-shaped fort built by Captain Francis Light in George Town, Penang."
    },
    {
        "name": "Istana Lama Seri Menanti",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "A wooden royal palace in Negeri Sembilan, built in 1908 without the use of nails, showcasing Minangkabau architecture."
    },
    {
        "name": "Fort Margherita",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "Built in 1879 by Charles Brooke, the White Rajah of Sarawak, to guard Kuching from pirates."
    },
    {
        "name": "Cheong Fatt Tze Mansion (Blue Mansion)",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "A 19th-century Chinese courtyard house in George Town, Penang, blending Eastern and Western architecture."
    },
    {
        "name": "Merdeka Square (Dataran Merdeka)",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "Historic site in Kuala Lumpur where Malaysia declared independence on August 31, 1957."
    },
    {
        "name": "Batu Caves Temple",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtVFaLMVljG9ZoyMTvMGj11TOIa60MStJ7Q&s",
        "description": "A Hindu temple and shrine located in limestone caves near Kuala Lumpur, famous for the giant Lord Murugan statue."
    }
];


// Suggested Places Data
const suggestedPlaces = [
  { name: "Penang Hill", state: "Penang" },
  { name: "Gunung Mulu Caves", state: "Sarawak" },
  { name: "Mount Kinabalu", state: "Sabah" },
  { name: "Langkawi Sky Bridge", state: "Kedah" }
];

// Routes
app.get("/api/getplaces", (req, res) => {
  res.json(historicalPlaces);
});

app.get("/api/suggestplace", (req, res) => {
  res.json(suggestedPlaces);
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
