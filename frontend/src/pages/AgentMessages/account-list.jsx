import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Card, Input } from "reactstrap";
import { Link } from "react-router-dom";

const AccountList = ({ agent }) => {
  return (
    <Card className="chat-leftsidebar me-md-3 p-3 bg-light">
      <div>
        <h5 className="font-size-14 mb-3">Accounts</h5>
        <ul className="list-unstyled chat-list">
          {agent ? (
            agent.contacts ? (
              agent.contacts.map((contact) => (
                <li className="metismenu list-unstyled mb-2">
                  <Link to="#" className="position-relative">
                    <div className="d-flex align-items-center">
                      <div className="avatar-xs align-self-center me-3">
                        <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                          <i className="bx bx-street-view"></i>
                        </span>
                      </div>
                      <div>
                        <div>{contact.phone}</div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              ""
            )
          ) : (
            <li className="p-2 pt-0">No Account found</li>
          )}

          {/* <PerfectScrollbar style={{ height: "53vh" }}>
            <ContactItem key={agents.id} agent={agents} />
          </PerfectScrollbar> */}
        </ul>
      </div>
    </Card>
  );
};

export default AccountList;
