# Auction API

This is a simple API for managing auction bids using Node.js, Express, and MongoDB.

## Features

- Manage auction items
- Manage bids 
- Get all bids for a selected auction item

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/gayashanacd/group_11_silent_auction.git
    ```
2. Navigate to the project directory:
    ```bash
    cd backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Configuration

MongoDB is running in cloud. 

### Start the server

node server.js

## Important API Endpoints

### Get all auction items
- api : http://localhost:5000/api/getitems
- type : GET

### Add a new auction item
- api : http://localhost:5000/api/newitem
- type : POST
- Input : ``` {
    "name" : "2017 Jeep Wrangler Sport 4WD",
    "decription" : "The 2017 Jeep Wrangler Sport 4WD is an iconic off-road vehicle renowned for its rugged capability and adventurous spirit. Equipped with a 3.6-liter V6 engine and four-wheel drive, it excels in tackling challenging terrains.",
    "imgUrl" : "wrangler.jpg",
    "metaData" : {
        "Engine" : "285 hp 3.6L V6",
        "Transmission" : "Automatic",
        "Mileage" : "124708",
        "Drivetrain" : "Four-Wheel Drive",
        "Exterior colour" : "Brown"
    },
    "startBid" : 19000
} ```

### Get all bids for selected auction item
- api : http://localhost:5000/api/getbidsforitem?itemId=66a7f34b0c97775a4eab176b
- type : GET

### Add a new bid
- api : http://localhost:5000/api/newbid
- type : POST
- Input : ``` {
    "itemId" : "66a7f34b0c97775a4eab176b",
    "bidderName" : "Colin Simpson",
    "bidAmount" : 14200,
    "contactNumber" : "985-754-4236"
} ```
