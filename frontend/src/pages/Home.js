import React, { useEffect, useState } from 'react';
import AuctionList from '../components/AuctionList';


function Home() {
  const [items, setItems] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/getitems`)
      .then(response => {
        console.log('Raw response:', response); // Log the raw response
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        setItems(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [API_BASE_URL]);


  return (
    <div className="home">
      <h1>Car Auctions</h1>
      <AuctionList items={items} />
    </div>
  );
}

export default Home;