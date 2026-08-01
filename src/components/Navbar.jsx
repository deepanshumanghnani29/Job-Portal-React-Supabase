import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/company-form"><button>Company Inserted</button></Link>
      <Link to="/jobs"><button>Jobs</button></Link>
      <Link to="/companies"><button>Companies</button></Link>
    </nav>
  );
};

export default Navbar;

