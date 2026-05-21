import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Home() {
  return (
    <div className="container mt-4">

      {/* Heading */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Welcome to ArticleHub ✍️</h1>
        <p className="text-muted">
          Write, share, and inspire with your articles.
        </p>
      </div>

      {/* Carousel */}
      <div
        id="carouselExample"
        className="carousel slide shadow rounded overflow-hidden"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200"
              className="d-block w-100"
              alt="Writing"
              style={{
                height: "500px",
                objectFit: "cover"
              }}
            />

            <div className="carousel-caption">
              <h3>Write Creative Stories</h3>
              <p>Turn your ideas into engaging articles.</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200"
              className="d-block w-100"
              alt="Knowledge"
              style={{
                height: "500px",
                objectFit: "cover"
              }}
            />

            <div className="carousel-caption">
              <h3>Share Knowledge</h3>
              <p>Reach readers across the world.</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"
              className="d-block w-100"
              alt="Readers"
              style={{
                height: "500px",
                objectFit: "cover"
              }}
            />

            <div className="carousel-caption">
              <h3>Inspire Readers</h3>
              <p>Create content that makes an impact.</p>
            </div>
          </div>

        </div>

        {/* Previous button */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">
            Previous
          </span>
        </button>

        {/* Next button */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">
            Next
          </span>
        </button>
      </div>

    </div>
  );
}

export default Home;