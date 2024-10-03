import { Link } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoSettings,IoSpeedometerOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
export default function KanbasNavigation() {
  return (
    <div 
      className="list-group rounded-0 bg-black position-fixed bottom-0 top-0 z-2 d-none d-md-block"
      id="wd-kanbas-navigation"
      style={{ width: 120}}
    >
      <a 
      className="border-0 text-center bg-black text-white list-group-item"
      href="https://www.northeastern.edu/"
      id="wd-neu-link" 
      target="_blank" 
      rel="noopener noreferrer"
      >
       <img 
          src="/images/neu.png"
          className="img-fluid"
          style={{ width: '200px', height: '70px' }}
        />
        <br />
      </a>
      <Link 
       className="border-0 text-center bg-white text-danger list-group-item" 
       to="/Kanbas/Account" 
       id="wd-account-link"
      >
       <MdOutlineAccountCircle className="fs-1" />
       <br />
       Account
      </Link>
      <Link 
       className="border-0 text-center bg-black text-white list-group-item" 
       to="/Kanbas/Dashboard" 
       id="wd-dashboard-link"
      >
        <IoSpeedometerOutline className="fs-1 text-danger"/>
        <br />
        Dashboard
      </Link>
      <Link 
       className="border-0 text-center bg-black text-white list-group-item" 
       to="/Kanbas/Courses" 
       id="wd-course-link"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </Link>
      <Link 
       className="border-0 text-center bg-black text-white list-group-item" 
       to="/Kanbas/Calendar" 
       id="wd-calendar-link"
      >
        <FaCalendar className="fs-1 text-danger" 
        />
        <br />
        Calendar
      </Link>
      <Link 
       className="border-0 text-center bg-black text-white list-group-item" 
       to="/Kanbas/Inbox" 
       id="wd-inbox-link"
       >
        <FaInbox className="fs-1
        text-danger" 
        />
        <br />
        Inbox
      </Link>
      <Link 
       className="border-0 text-center bg-black text-white list-group-item" 
       to="/Labs" 
       id="wd-labs-link"
       >
        <IoSettings className="fs-1
        text-danger" 
        />
        <br />
        Labs
      </Link>
    </div>
);
}