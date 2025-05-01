import { NavLink } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Container } from "../Index";
import logo from "../../assests/Logo.png";
import { useSelector } from "react-redux";

export default function Footer() {
  const user = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "AddPost",
      slug: "/addPost",
      active: user,
    },
    {
      name: "Account",
      slug: "/myAccount",
      active: user,
    },

    {
      name: "SignUp",
      slug: "/signUp",
      active: !user,
    },
    {
      name: "LogIn",
      slug: "/login",
      active: !user,
    },
  ];
  return (
    <Container>
      <footer className=" mx-auto max-w-[1400px] text-gray-500 bg-[#12121204] border-t border-gray-200   font-medium">
        <div className="mx-auto  px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm place-items-start md:place-items-start">
          {/* Logo + Description */}
          <div className="text-center md:text-left place-self-center ">
            <NavLink to="/" className="inline-block mb-4 ">
              <img src={logo} width={140} />
            </NavLink>
            <p className="leading-relaxed">
              Your go-to blog for web dev tutorials, insights, and trends.
            </p>
            <div className="mt-2 text-xs text-gray-400 ">
              © {new Date().getFullYear()} Your Vlogee. All rights reserved.
            </div>
          </div>

          {/* Navigation Links */}

          <div className="md:mx-auto place-self-start sm:place-self-center">
            <h4 className="text-black  font-semibold mb-3">Navigation</h4>
            <ul className="space-y-3 text-[13px]  text-gray-400">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `${isActive ? "text-blue-600" : "text-gray-400"}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="md:mx-auto place-self-start md:place-self-center">
            <h4 className="text-black font-semibold   mb-3 ">Useful Links</h4>
            <ul className="space-y-3 text-[13px]  text-gray-400">
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "hover:text-gray-400"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/privacy"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "hover:text-gray-400"
                  }
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/terms"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "hover:text-gray-400"
                  }
                >
                  Terms & Conditions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "hover:text-gray-400"
                  }
                >
                  Support
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="place-self-center ">
            <h4 className="text-black font-semibold mb-3 text-center">
              Follow Us
            </h4>
            <div className="flex gap-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-600"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="https://github.com/Lokendra0001"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/lokendrarajpurohit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
      </footer>
    </Container>
  );
}
