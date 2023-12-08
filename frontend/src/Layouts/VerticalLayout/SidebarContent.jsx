import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import withRouter from "../../Components/Common/withRouter";

const SidebarContent = (props) => {
  const ref = useRef();

  const { role } = useSelector((state) => state.Login.user) || {};
  const isAdmin = role === "admin";

  const isActivePage = (path) => props.router.location.pathname === path;

  const navLinks = [
    {
      path: "/dashboard",
      icon: "bx bx-chart",
      label: "Dashboard",
      isAdminOnly: true,
    },
    {
      path: "/chat",
      icon: "bx bx-chat",
      label: "Chat",
      isAdminOnly: false,
    },
    {
      path: "/whatsapp-accounts",
      icon: "bx bx-collection",
      label: "Whatsapp Accounts",
      isAdminOnly: true,
    },
    {
      path: "/whatsapp-agent-accounts",
      icon: "bx bx-collection",
      label: "Whatsapp Accounts",
      isAgentOnly: true,
    },
    {
      path: "/keywords",
      icon: "bx bx-file",
      label: "Keywords",
      isAdminOnly: true,
    },
    {
      path: "/agents",
      icon: "bx bx-street-view",
      label: "Agents",
      isAdminOnly: true,
    },
    {
      path: "/messages",
      icon: "bx bx-collection",
      label: "Messages",
      isAdminOnly: true,
    },
  ];

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {navLinks.map(
              ({ path, icon, label, isAdminOnly, isAgentOnly }) =>
                isAdmin &&
                !isAgentOnly && (
                  <li key={path}>
                    <Link to={path}>
                      <i
                        className={`${icon} ${
                          isActivePage(path) ? "mm-active" : ""
                        }`}
                      ></i>
                      <span className={isActivePage(path) ? "mm-active" : ""}>
                        {label}
                      </span>
                    </Link>
                  </li>
                )
            )}
            {navLinks.map(
              ({ path, icon, label, isAdminOnly, isAgentOnly }) =>
                !isAdmin &&
                (isAgentOnly || !isAdminOnly) && (
                  <li key={path}>
                    <Link to={path}>
                      <i
                        className={`${icon} ${
                          isActivePage(path) ? "mm-active" : ""
                        }`}
                      ></i>
                      <span className={isActivePage(path) ? "mm-active" : ""}>
                        {label}
                      </span>
                    </Link>
                  </li>
                )
            )}
            {/* {navLinks.map(
              ({ path, icon, label, isAdminOnly, isAgentOnly }) =>
                (!isAdminOnly || isAdmin) && (
                  <li key={path}>
                    <Link to={path}>
                      <i
                        className={`${icon} ${
                          isActivePage(path) ? "mm-active" : ""
                        }`}
                      ></i>
                      <span className={isActivePage(path) ? "mm-active" : ""}>
                        {label}
                      </span>
                    </Link>
                  </li>
                )
            )} */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

export default withRouter(SidebarContent);
