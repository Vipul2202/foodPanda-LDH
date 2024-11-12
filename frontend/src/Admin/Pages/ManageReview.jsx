import React, { useState, useEffect } from 'react';
import { Card, Button, Pagination, Row, Col } from 'react-bootstrap';

export default function ManageReview({ setIsActive, isActive }) {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  useEffect(() => {
    // Hard-coded dummy reviews
    const dummyReviews = [
      { id: 1, username: 'Alice', rating: 5, comments: 'Excellent service!' },
      { id: 2, username: 'Bob', rating: 4, comments: 'Very good, but could be better.' },
      { id: 3, username: 'Charlie', rating: 3, comments: 'Average experience.' },
      { id: 4, username: 'David', rating: 2, comments: 'Not satisfied with the product.' },
      { id: 5, username: 'Eve', rating: 8, comments: 'Horrible experience, will not return.' },
      { id: 5, username: 'Eve', rating: 8, comments: 'Horrible experience, will not return.' },
      { id: 5, username: 'Eve', rating: 8, comments: 'Horrible experience, will not return.' },
    ];

    setReviews(dummyReviews);
  }, []);

  const handleDelete = (id) => {
    // Delete review
    setReviews(reviews.filter(review => review.id !== id));
  };

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div>
      <main
        id="main"
        className={`main mainWrapper ${isActive === true && 'active'}`}
        style={{
          background: 'linear-gradient(135deg, #f06, #ffcc00)',
          minHeight: '100vh',
          padding: '20px'
        }}
      >
        <h2 className="text-center mb-4">Manage Customer Reviews</h2>

        <Row>
          {currentReviews.length > 0 ? (
            currentReviews.map((review) => (
              <Col key={review.id} md={6} lg={4} className="mb-3">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{review.username}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Rating: {'⭐'.repeat(review.rating)} ({review.rating}/5)
                    </Card.Subtitle>
                    <Card.Text>
                      {review.comments}
                    </Card.Text>
                    <Button variant="danger" onClick={() => handleDelete(review.id)}>Delete Review</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </Row>

        <div className="pagination-container">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map(number => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => setCurrentPage(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>

      </main>
    </div>
  );
}
