import React from 'react'

export default function Crousel({ setIsActive, isActive }) {
  return (
    <div>
          <main id="main" className={`main mainWrapper ${isActive === true && 'active'}`}>

<div className="adminpagetitle">
  <h1 className='text-start'>Carousel</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="index.html">Home</a></li>
      <li className="breadcrumb-item">Components</li>
      <li className="breadcrumb-item active">Carousel</li>
    </ol>
  </nav>
</div>
{/* <!-- End Page Title --> */}

<section className="section">
  <div className="row">
    <div className="col-lg-6">

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Slides only</h5>

          {/* <!-- Slides only carousel --> */}
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/assets/img/slides-1.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="/assets/img/slides-2.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="/assets/img/slides-3.jpg" className="d-block w-100" alt="..."/>
              </div>
            </div>
          </div>
          {/* <!-- End Slides only carousel--> */}

        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">With indicators</h5>

          {/* <!-- Slides with indicators --> */}
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/assets/img/slides-1.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="/assets/img/slides-2.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="/assets/img/slides-3.jpg" className="d-block w-100" alt="..."/>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>

          </div>
          {/* <!-- End Slides with indicators --> */}

        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Carousel with fade transition</h5>
          {/* <p>Add <code>.carousel-fade</code> to your carousel to animate slides with a fade transition instead of a slide.</p> */}

          {/* <!-- Slides with fade transition --> */}
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/assets/img/slides-1.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="/assets/img/slides-2.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="/assets/img/slides-3.jpg" className="d-block w-100" alt="..."/>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>

          </div>
          {/* <!-- End Slides with fade transition --> */}

        </div>
      </div>

    </div>

    <div className="col-lg-6">

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">With controls</h5>

          {/* <!-- Slides with controls --> */}
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/assets/img/slides-1.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="/assets/img/slides-2.jpg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="/assets/img/slides-3.jpg" className="d-block w-100" alt="..."/>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>

          </div>
          {/* <!-- End Slides with controls --> */}

        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">With captions</h5>

          {/* <!-- Slides with captions --> */}
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/assets/img/slides-1.jpg" className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="/assets/img/slides-2.jpg" className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="/assets/img/slides-3.jpg" className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>

          </div>
          {/* <!-- End Slides with captions --> */}

        </div>
      </div>

    </div>
  </div>
</section>

</main>
{/* <!-- End #main --> */}
    </div>
  )
}
