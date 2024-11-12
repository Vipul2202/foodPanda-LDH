import React, { useState } from 'react';
// import cake from "../../assets/img/cake.jpg";
import axios from 'axios';


export default function AddBanner({ setIsActive, isActive }) {
  const [bannerUrl, setBannerUrl] = useState('');
  const [imageUrl, setImageUrl] = useState();

  const handleAddBanner = async () => {
    if (bannerUrl) {
      setImageUrl(bannerUrl);
      try {
        const res = await axios.post("http://localhost:5000/banner/addbanner", { imageUrl: bannerUrl });
        console.log("Banner added successfully", res.data);
      } catch (error) {
        console.error("Error adding banner:", error.response ? error.response.data : error.message);
      }
      setBannerUrl('');
    }
  };

  const handleDeleteBanner = async () => {
    try {
      const res = await axios.post("http://localhost:5000/banner/deletebanner", { imageUrl });
      console.log("Banner deleted successfully", res.data);
      setImageUrl(); // Reset to default image
    } catch (error) {
      console.error("Error deleting banner:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
   <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`} style={{ minHeight: '100vh', background: 'linear-gradient(130deg, #6a11cb 0%, #2575fc 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card shadow-lg border-0 rounded-lg text-center" style={{ width: '400px', padding: '20px', backgroundColor: '#fff', borderRadius: '20px' }}>
          <h3 className="card-title mb-3">Add Banner</h3>
          
          <div className="form-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter banner URL"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              style={{ padding: '10px', borderRadius: '8px' }}
            />
          </div>

          <div className="d-flex justify-content-around mb-4">
            <button onClick={handleAddBanner} className="btn btn-primary" style={{ backgroundColor: '#ff4d4d', borderColor: '#ff4d4d', padding: '10px 20px', borderRadius: '8px' }}>
              Submit
            </button>
            <button onClick={handleDeleteBanner} className="btn btn-outline-primary" style={{ padding: '10px 20px', borderRadius: '8px' }}>
              Delete
            </button>
          </div>

          {imageUrl && (
            <div className="text-center">
              <h5 className="mb-3">Banner Preview</h5>
              <img 
                src={imageUrl} 
                alt="Banner Preview" 
                className="img-fluid rounded shadow-sm" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px', transition: 'transform 0.3s', transform: 'scale(1.05)' }} 
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
