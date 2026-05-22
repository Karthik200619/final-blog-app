import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getProfilePath = () => {
    if (!user) return "/";

    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="
            text-3xl font-extrabold
            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500
            bg-clip-text text-transparent
            hover:scale-105
            transition-transform duration-300
          "
        >
          MyBlog
        </NavLink>

        {/* Navigation Links */}
        <ul className="flex items-center gap-3">

          {/* Home */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `
                px-5 py-2 rounded-xl font-medium
                transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }
                `
              }
            >
              Home
            </NavLink>
          </li>

          {!isAuthenticated && (
            <>
              {/* Register */}
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `
                    px-5 py-2 rounded-xl font-medium
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }
                    `
                  }
                >
                  Register
                </NavLink>
              </li>

              {/* Login */}
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `
                    px-5 py-2 rounded-xl font-medium
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }
                    `
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              {/* Profile */}
              <li>
                <NavLink
                  to={getProfilePath()}
                  className={({ isActive }) =>
                    `
                    px-5 py-2 rounded-xl font-medium
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }
                    `
                  }
                >
                  Profile
                </NavLink>
              </li>

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="
                    px-5 py-2
                    rounded-xl
                    font-medium
                    text-red-500
                    hover:bg-red-50
                    hover:text-red-600
                    transition-all duration-300
                  "
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
