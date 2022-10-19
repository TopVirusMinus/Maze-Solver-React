import CSS from "./Navbar.module.css";
const Navbar = ({ children }) => {
  return <div className={CSS.navbar}>{children}</div>;
};

export default Navbar;
