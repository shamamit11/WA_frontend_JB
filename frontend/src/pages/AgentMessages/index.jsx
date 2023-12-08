import Breadcrumbs from "Components/Common/Breadcrumb";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "reactstrap";
import { getAgentwithContacts } from "slices/thunk";
import AccountList from "./account-list";
//import MessageInterface from "./message-interface.js";
//import MessageInterface from "../Messages/message-interface";

const AgentMessages = () => {
  document.title = "Messages | ";
  const dispatch = useDispatch();

  const { agents, messages, activeContact, fetchError, fetching } = useSelector(
    (state) => ({
      agents: state.Messages.agents,
      messages: state.Messages.messages,
      activeContact: state.Messages.activeContact,
      fetching: state.Messages.fetching,
      fetchError: state.Messages.fetchError,
    })
  );

  useEffect(() => {
    if (agents.length === 0) {
      dispatch(getAgentwithContacts());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="Messages" />
          <Row>
            <Col lg={12}>
              <div className="d-lg-flex">
                <AccountList agent={agents} />
                {/* <MessageInterface
                  messages={messages}
                  activeContact={activeContact}
                /> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AgentMessages;
