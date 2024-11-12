import React from 'react'

export default function Formvalidation() {
  return (
    <div>
          <main id="main" className="main">

<div className="adminpagetitle">
  <h1 className='text-start'>Form Validation</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="index.html">Home</a></li>
      <li className="breadcrumb-item">Forms</li>
      <li className="breadcrumb-item active">Validation</li>
    </ol>
  </nav>
</div>
{/* <!-- End Page Title --> */}

<section className="section">
  <div className="row">
    <div className="col-lg-6">

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Browser Default</h5>
          <p>Browser default validation with using the <code>required</code> keyword. Try submitting the form below. Depending on your browser and OS, you’ll see a slightly different style of feedback.</p>

          {/* <!-- Browser Default Validation --> */}
          <form className="row g-3">
            <div className="col-md-4">
              <label for="validationDefault01" className="form-label">First name</label>
              <input type="text" className="form-control" id="validationDefault01" value="John" required/>
            </div>
            <div className="col-md-4">
              <label for="validationDefault02" className="form-label">Last name</label>
              <input type="text" className="form-control" id="validationDefault02" value="Doe" required/>
            </div>
            <div className="col-md-4">
              <label for="validationDefaultUsername" className="form-label">Username</label>
              <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend2">@</span>
                <input type="text" className="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required/>
              </div>
            </div>
            <div className="col-md-6">
              <label for="validationDefault03" className="form-label">City</label>
              <input type="text" className="form-control" id="validationDefault03" required/>
            </div>
            <div className="col-md-3">
              <label for="validationDefault04" className="form-label">State</label>
              <select className="form-select" id="validationDefault04" required>
                <option selected disabled value="">Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="col-md-3">
              <label for="validationDefault05" className="form-label">Zip</label>
              <input type="text" className="form-control" id="validationDefault05" required/>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required/>
                <label className="form-check-label" for="invalidCheck2">
                  Agree to terms and conditions
                </label>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Submit form</button>
            </div>
          </form>
          {/* <!-- End Browser Default Validation --> */}

        </div>
      </div>

    </div>

    <div className="col-lg-6">

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Custom Styled Validation</h5>
          <p>For custom Bootstrap form validation messages, you’ll need to add the <code>novalidate</code> boolean attribute to your <code>&lt;form&gt;</code>. This disables the browser default feedback tooltips, but still provides access to the form validation APIs in JavaScript. </p>

          {/* <!-- Custom Styled Validation --> */}
          <form className="row g-3 needs-validation" novalidate>
            <div className="col-md-4">
              <label for="validationCustom01" className="form-label">First name</label>
              <input type="text" className="form-control" id="validationCustom01" value="John" required/>
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-4">
              <label for="validationCustom02" className="form-label">Last name</label>
              <input type="text" className="form-control" id="validationCustom02" value="Doe" required/>
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-4">
              <label for="validationCustomUsername" className="form-label">Username</label>
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">@</span>
                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label for="validationCustom03" className="form-label">City</label>
              <input type="text" className="form-control" id="validationCustom03" required/>
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>
            <div className="col-md-3">
              <label for="validationCustom04" className="form-label">State</label>
              <select className="form-select" id="validationCustom04" required>
                <option selected disabled value="">Choose...</option>
                <option>...</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
            <div className="col-md-3">
              <label for="validationCustom05" className="form-label">Zip</label>
              <input type="text" className="form-control" id="validationCustom05" required/>
              <div className="invalid-feedback">
                Please provide a valid zip.
              </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                <label className="form-check-label" for="invalidCheck">
                  Agree to terms and conditions
                </label>
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Submit form</button>
            </div>
          </form>
          {/* <!-- End Custom Styled Validation --> */}

        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Custom Styled Validation with Tooltips</h5>
          <p>If your form layout allows it, you can swap the <code>-feedback</code> classes for .<code>-tooltip</code> classes to display validation feedback in a styled tooltip. Be sure to have a parent with <code>position: relative</code> on it for tooltip positioning. In the example below, our column classes have this already, but your project may require an alternative setup. </p>

          {/* <!-- Custom Styled Validation with Tooltips --> */}
          <form className="row g-3 needs-validation" novalidate>
            <div className="col-md-4 position-relative">
              <label for="validationTooltip01" className="form-label">First name</label>
              <input type="text" className="form-control" id="validationTooltip01" value="John" required/>
              <div className="valid-tooltip">
                Looks good!
              </div>
            </div>
            <div className="col-md-4 position-relative">
              <label for="validationTooltip02" className="form-label">Last name</label>
              <input type="text" className="form-control" id="validationTooltip02" value="Doe" required/>
              <div className="valid-tooltip">
                Looks good!
              </div>
            </div>
            <div className="col-md-4 position-relative">
              <label for="validationTooltipUsername" className="form-label">Username</label>
              <div className="input-group has-validation">
                <span className="input-group-text" id="validationTooltipUsernamePrepend">@</span>
                <input type="text" className="form-control" id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" required/>
                <div className="invalid-tooltip">
                  Please choose a unique and valid username.
                </div>
              </div>
            </div>
            <div className="col-md-6 position-relative">
              <label for="validationTooltip03" className="form-label">City</label>
              <input type="text" className="form-control" id="validationTooltip03" required/>
              <div className="invalid-tooltip">
                Please provide a valid city.
              </div>
            </div>
            <div className="col-md-3 position-relative">
              <label for="validationTooltip04" className="form-label">State</label>
              <select className="form-select" id="validationTooltip04" required>
                <option selected disabled value="">Choose...</option>
                <option>...</option>
              </select>
              <div className="invalid-tooltip">
                Please select a valid state.
              </div>
            </div>
            <div className="col-md-3 position-relative">
              <label for="validationTooltip05" className="form-label">Zip</label>
              <input type="text" className="form-control" id="validationTooltip05" required/>
              <div className="invalid-tooltip">
                Please provide a valid zip.
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Submit form</button>
            </div>
          </form>
          {/* <!-- End Custom Styled Validation with Tooltips --> */}

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
