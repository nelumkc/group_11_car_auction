import React, { useEffect, useState }  from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Form , Table } from 'react-bootstrap';
import AuctionItemFooter from '../components/AuctionItemFooter';


function AuctionDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [bids, setBids] = useState([]);
  const [name, setName] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getitem/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      })
      .catch((error) => console.error('Error fetching item data:', error));

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getbidsforitem?itemId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched bids:', data); // Debugging log
        setBids(data);
      })
      .catch((error) => console.error('Error fetching bids:', error));
  }, [id]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const bidData = {
      itemId: id,
      bidderName: name,
      bidAmount: parseFloat(bidAmount),
      contactNumber: contactNumber,
    };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/newbid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bidData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Bid added:', data);
        setName('');
        setBidAmount('');
        setContactNumber('');
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getbidsforitem?itemId=${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log('Refetched bids:', data); // Debugging log
            setBids(data);
          })
          .catch((error) => console.error('Error fetching bids:', error));
      })
      .catch((error) => console.error('Error adding bid:', error));
  };

  const getHighestBid = () => {
    if (!bids || bids.length === 0) return 0;
    return Math.max(...bids.map((bid) => bid.bidAmount));
  };

  return (
    <Container className="auction-detail">
      {item ? (
        <>
          <Row className="mt-4">
            <Col md={6}>
              <Card>
                <Card.Img variant="top" src={item.imgUrl} alt={item.name} />
              </Card>
            </Col>
            <Col md={6}>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td><strong>Engine:</strong></td>
                    <td>{item.metaData.Engine}</td>
                  </tr>
                  <tr>
                    <td><strong>Transmission:</strong></td>
                    <td>{item.metaData.Transmission}</td>
                  </tr>
                  <tr>
                    <td><strong>Mileage:</strong></td>
                    <td>{item.metaData.Mileage}</td>
                  </tr>
                  <tr>
                    <td><strong>Drivetrain:</strong></td>
                    <td>{item.metaData.Drivetrain}</td>
                  </tr>
                  <tr>
                    <td><strong>Exterior Colour:</strong></td>
                    <td>{item.metaData['Exterior colour']}</td>
                  </tr>
                  <tr>
                    <td><strong>Starting Bid:</strong></td>
                    <td>{item.startBid}</td>
                  </tr>
                  <tr>
                    <td><strong>Highest Bid:</strong></td>
                    <td>${getHighestBid().toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td><strong>Number of Bids:</strong></td>
                    <td>{bids.length}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={8}>
              <Form onSubmit={handleBidSubmit}>
                <Form.Group controlId="bidName">
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="bidAmount" className="mt-2">
                  <Form.Control
                    type="number"
                    placeholder="Enter Your Maximum Bid"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="contactNumber" className="mt-2">
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button
                variant="danger"
                type="submit"
                className="w-100"
                onClick={handleBidSubmit}
              >
                Place Bid
              </Button>
            </Col>
          </Row>
          <AuctionItemFooter />
        </>
      ) : (
        <p>Auction not found!</p>
      )}
    </Container>
  );
}

export default AuctionDetail;