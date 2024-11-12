import React, { useState } from 'react'

export default function AdminFooter({ setIsActive, isActive }) {
    // const [isActive, setIsActive]= useState(false)
  return (
    <div>
          {/* <!-- ======= Footer ======= --> */}
  <footer id="footer" className={`adminfooter  ${isActive === true && 'active'}`}>
    <div className="copyright">
      &copy; Copyright <strong><span>Backers</span></strong>. All Rights Reserved
    </div>
    <div className="credits">
    
      Designed by <a href="#" className='px-1'>  ShreeKrishna Bakers</a>
    </div>
  </footer>
  {/* <!-- End Footer --> */}
    </div>
  )
}
