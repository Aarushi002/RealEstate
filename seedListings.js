import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./api/models/listing.model.mjs";

dotenv.config();

const cities = [
  "New York","Los Angeles","Chicago","Houston","Miami",
  "Dallas","San Diego","Boston","Seattle","San Jose"
];

const images = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  "https://images.unsplash.com/photo-1494526585095-c41746248156"
];

const listings = [];

for (let i = 1; i <= 50; i++) {
  listings.push({
    name: `Property ${i}`,
    description: `Beautiful property number ${i}`,
    address: cities[Math.floor(Math.random()*cities.length)],
    regularPrice: Math.floor(Math.random()*900000)+100000,
    discountedPrice: Math.floor(Math.random()*800000)+80000,
    bedrooms: Math.floor(Math.random()*5)+1,
    bathrooms: Math.floor(Math.random()*4)+1,
    furnished: Math.random() > 0.5,
    parking: Math.random() > 0.5,
    type: Math.random() > 0.5 ? "rent" : "sale",
    offer: Math.random() > 0.5,
    imageUrls: [images[Math.floor(Math.random()*images.length)]],
    userRef: "123456"
  });
}

const seedListings = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    await Listing.insertMany(listings);
    console.log("50 listings inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
    mongoose.connection.close();
  }
};

seedListings();