import React, { useState } from "react";
// import cake from "../../assets/img/cake.jpg";
import axios from "axios";

export default function AddBanner({ setIsActive, isActive }) {
  const [bannerUrl, setBannerUrl] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const token = sessionStorage.getItem("token");
  const header = {
    Accept: "application/json",
    Authorization: sessionStorage.getItem("token"),
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  let data = JSON.stringify({
    image_url:
      bannerUrl.length > 0
        ? bannerUrl
        : "https://images.unsplash.com/photo-1511407397940-d57f68e81203?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${apiUrl}/admin/addBanner`,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en-IN;q=0.9,en;q=0.8",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      DNT: "1",
      Origin: `${apiUrl}`,
      Referer: `${apiUrl}`,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
      "sec-ch-ua":
        '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      Authorization: sessionStorage.getItem("token"),
    },
    data: data,
  };

  const handleAddBanner = async () => {
    if (bannerUrl) {
      setImageUrl(bannerUrl);
      try {
        // const res = await axios.post("http://localhost:8080/admin/addBanner", { imageUrl: bannerUrl }, Headers = header);
        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });

        // console.log("Banner added successfully", res.data);
        console.log("Banner added successfully");
      } catch (error) {
        console.error(
          "Error adding banner:",
          error.response ? error.response.data : error.message
        );
      }
      setBannerUrl("");
    }
  };

  const handleDeleteBanner = async () => {
    try {
      const res = await axios.post(`${apiUrl}/admin/deleteBanner`, {
        imageUrl,
      });
      console.log("Banner deleted successfully", res.data);
      setImageUrl(); // Reset to default image
    } catch (error) {
      console.error(
        "Error deleting banner:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <main
        id="main"
        className={`main mainWrapper ${isActive === true && "active"}`}
        style={{
          minHeight: "100vh",
          background: "linear-gradient(130deg, #6a11cb 0%, #2575fc 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="card shadow-lg border-0 rounded-lg text-center"
          style={{
            width: "400px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "20px",
          }}
        >
          <h3 className="card-title mb-3">Add Banner</h3>

          <div className="form-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter banner URL"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              style={{ padding: "10px", borderRadius: "8px" }}
            />
          </div>

          <div className="d-flex justify-content-around mb-4">
            <button
              onClick={handleAddBanner}
              className="btn btn-primary"
              style={{
                backgroundColor: "#ff4d4d",
                borderColor: "#ff4d4d",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              Submit
            </button>
            <button
              onClick={handleDeleteBanner}
              className="btn btn-outline-primary"
              style={{ padding: "10px 20px", borderRadius: "8px" }}
            >
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
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  transition: "transform 0.3s",
                  transform: "scale(1.05)",
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
