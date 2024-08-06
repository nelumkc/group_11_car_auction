import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../AuctionItemFooter.css'; 

function AuctionItemFooter() {
  const [footerData, setFooterData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getitems`)
      .then((response) => response.json())
      .then((items) => {
        // Fetch bids for each item and calculate the highest bid
        const fetchBidsPromises = items.map(item =>
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getbidsforitem?itemId=${item._id}`)
            .then(response => response.json())
            .then(bids => {
              const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => bid.bidAmount)) : item.startBid;
              return { ...item, highestBid };
            })
        );

        Promise.all(fetchBidsPromises)
          .then(itemsWithBids => {
            setFooterData(itemsWithBids);
          })
          .catch(error => console.error('Error fetching bids:', error));
      })
      .catch((error) => console.error('Error fetching footer data:', error));
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const chunkSize = 4;
  const carouselItems = [];

  for (let i = 0; i < footerData.length; i += chunkSize) {
    const chunk = footerData.slice(i, i + chunkSize);
    carouselItems.push(chunk);
  }

  return (
    <footer className="bg-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={12}>
            <h5>More From This Seller</h5>
            <Carousel 
              activeIndex={index} 
              onSelect={handleSelect} 
              interval={5000}
              controls={false}
              indicators={true}
            >
              {carouselItems.map((chunk, idx) => (
                <Carousel.Item key={idx}>
                  <Row>
                    {chunk.map(item => (
                      <Col md={3} key={item._id}>
                        <Card className="footer-card">
                          <Card.Img variant="top" src={item.imgUrl} alt={item.name} className="footer-card-img" />
                          <Card.Body className="footer-card-body">
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                              Highest Bid: ${item.highestBid}
                            </Card.Text>
                            <Link to={`/auction/${item._id}`}>
                              <Button variant="primary">Bid Now</Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
            <a
              className="carousel-control-prev"
              href="#"
              role="button"
              onClick={() => handleSelect((index - 1 + carouselItems.length) % carouselItems.length)}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#"
              role="button"
              onClick={() => handleSelect((index + 1) % carouselItems.length)}
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default AuctionItemFooter;
