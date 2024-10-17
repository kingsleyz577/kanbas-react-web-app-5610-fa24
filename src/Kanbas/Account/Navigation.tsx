import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const { pathname } = useLocation();

  const links = [
    { label: "Signin", path: "/Kanbas/Account/Signin" },
    { label: "Signup", path: "/Kanbas/Account/Signup" },
    { label: "Profile", path: "/Kanbas/Account/Profile" },
  ];

  return (
    <div className="wd list-group fs-5 rounded-0" id="wd-account-navigation">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`list-group-item border-0 text-start bg-white ${
            pathname.includes(link.label) ? "text-black border-start border-2 border-black" : "text-danger"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
