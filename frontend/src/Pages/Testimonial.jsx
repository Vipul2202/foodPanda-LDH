import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { toast } from "react-toastify";
import axios from 'axios';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState(""); // State for the name field
  const [reviews, setReviews] = useState([]);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async() => {
    if (rating === 0 || comment === "" || name === "") {
      alert("Please provide a name, rating, and comment.");
      return
    
      }
      try {
        const res= await axios.post("http://localhost:5000/review/add",name,comment,rating).data
        console.log(res)
        
      } catch (error) {
        
        console.log(error,"error gauri")
    }

    // Add new review to the reviews array
    const newReview = {
      name: name, // Include name
      rating: rating,
      comment: comment,
    };
console.log("vipul", name,comment,rating)
    setReviews([...reviews, newReview]);
    setName(""); // Reset name
    setRating(0); // Reset rating
    setComment(""); // Reset comment
    setShowModal(false); // Close modal after submission
  };

  useEffect(() => {
    apiServices
      .getallTestimonial()
      .then((response) => {
        if (response.data.success) {
          setTestimonials(response.data.data);
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-xxl bg-light my-6 py-6 pb-0 mx-auto">
      <div className="container center">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
          <p className="text-primary text-uppercase mb-2">// Client's Review</p>
          <h1 className="display-6 mb-4">More Than 20000+ Customers Trusted Us</h1>
        </div>

        <div className="flex flex-col items-center justify-center h-screen p-4">
          {/* Add Review Button */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={() => setShowModal(true)}
          >
            Add Review
          </button>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Add Your Review</h2>
                
                {/* Name Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Star Rating */}
                <div className="flex mb-4">
                  {[...Array(5)].map((star, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className="cursor-pointer"
                    >
                      {index < rating ? (
                        <AiFillStar className="text-yellow-500 text-2xl" />
                      ) : (
                        <AiOutlineStar className="text-gray-400 text-2xl" />
                      )}
                    </span>
                  ))}
                </div>

                {/* Comment Input */}
                <textarea
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  placeholder="Add your comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    className="bg-gray-400 text-white py-2 px-4 rounded mr-2 hover:bg-gray-500"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Display Submitted Reviews */}
          <div className="mt-8 w-full max-w-lg">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-lg mb-4">
                {/* Display name */}
                <h3 className="text-lg font-bold">{review.name}</h3>

                {/* Display rating as stars */}
                <div className="flex mb-2">
                  {[...Array(5)].map((star, starIndex) => (
                    <span key={starIndex}>
                      {starIndex < review.rating ? (
                        <AiFillStar className="text-yellow-500 text-xl" />
                      ) : (
                        <AiOutlineStar className="text-gray-400 text-xl" />
                      )}
                    </span>
                  ))}
                </div>
                
                {/* Display Comment */}
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Swiper for Testimonials */}
        <div className="testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-item bg-black rounded p-4" style={{ background: "#EAA636" }}>
                  <div className="d-flex align-items-center mb-4">
                    <img className="flex-shrink-0 rounded-circle border p-1" src={BASE_URL_IMG + testimonial?.Image} alt={testimonial.UserName} />
                    <div className="ms-4">
                      <h5 className="mb-1">{testimonial?.UserName}</h5>
                    </div>
                  </div>
                  <p className="mb-0">{testimonial?.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
