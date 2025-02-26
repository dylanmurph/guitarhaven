const mongoose = require("mongoose");
//images taken from https://www.waltons.ie
// run: node seedGuitars.js
const guitars = [
    {
        name: "Fender Telecaster",
        model: "Telecaster Deluxe Shawbucker",
        year: 1973,
        price: 1577,
        type: "Electric",
        image: "/images/fenderAmericanProfessionalTelecasterDeluxeShawbucker.jpg",
    },
    {
        name: "Fender Stratocaster",
        model: "2 HSS Stratocaster",
        year: 2019,
        price: 1921,
        type: "Electric",
        image: "/images/fenderAmericanProfessional2HSSStratocaster.jpg",
    },
    {
        name: "Yamaha Revstar",
        model: "Revstar Standard RSS20FLG",
        year: 2025,
        price: 757,
        type: "Electric",
        image: "/images/yamahaRevstarStandardRSS20FLG.jpg",
    },
    {
        name: "Yamaha Pacifica",
        model: "Pacifica PA112VM",
        year: 2022,
        price: 304,
        type: "Electric",
        image: "/images/yamahaPA112VMPacifica.jpg",
    },
    {
        name: "Gretsch Streamliner",
        model: "G2210 Solid Body Streamliner",
        year: 2024,
        price: 315,
        type: "Electric",
        image: "/images/gretschG2210SolidBodyStreamliner.jpg",
    },
    {
        name: "Gretsch Electromatic",
        model: "G5220 Electromatic Jet BT Solid Body",
        year: 2024,
        price: 501,
        type: "Electric",
        image: "/images/gretschG5220ElectromaticJetBT.png",
    },
    {
        name: "Schecter Demon",
        model: "Demon 6",
        year: 2020,
        price: 699,
        type: "Electric",
        image: "/images/schecterDemon6.png",
    },
    {
        name: "Schecter C6 Plus HH",
        model: "C6 Plus HH String Thru Body",
        year: 2016,
        price: 499,
        type: "Electric",
        image: "/images/schecterC6PlusHH.jpg",
    },
    {
        name: "Taylor 618E",
        model: "618E Electro-Acoustic",
        year: 2010,
        price: 2559,
        type: "Acoustic",
        image: "/images/taylor618EElectro-Acoustic.jpg",
    },
    {
        name: "Yamaha ARE",
        model: "LL16 ARE",
        year: 2003,
        price: 1102,
        type: "Acoustic",
        image: "/images/yamahaLL16ARE.jpg",
    },
    {
        name: "Takamine G Series",
        model: "G Series GJ72CE",
        year: 2015,
        price: 559,
        type: "Acoustic",
        image: "/images/takamineGSeriesGJ72CE.png",
    },
    {
        name: "Taylor 814CE",
        model: "814CE Grand Auditorium",
        year: 1996,
        price: 3699,
        type: "Acoustic",
        image: "/images/taylor814CE.jpg",
    },
];


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/guitarhaven", {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
})
    .then(async () => {
        console.log("Connected to the database.");
        try {
            const result = await mongoose.connection.db.collection("guitars").deleteMany({});
            console.log(`Deleted ${result.deletedCount} documents.`);
            const result2 = await mongoose.connection.db.collection("guitars").insertMany(guitars);
            console.log(`${result2.insertedCount} products were added to the database.`);
        } catch (err) {
            console.error("Error during delete/insert:", err);
        }
        await mongoose.connection.close();
    })
    .catch((err) => console.error("Error connecting to database:", err));


