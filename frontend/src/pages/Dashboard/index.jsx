//import components
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import { fetchWhatsAppAccountsList } from "slices/thunk";
import { fetchAgentsList } from "slices/thunk";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { data, fetchError, fetching, dataAgents } = useSelector((state) => ({
    fetching: state.Whatsapp.fetching,
    data: state.Whatsapp.data,
    fetchError: state.Whatsapp.fetchError,
    dataAgents: state.Agents.data,
  }));

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchWhatsAppAccountsList());
      dispatch(fetchAgentsList());
    }
    if (dataAgents.length === 0) {
      dispatch(fetchAgentsList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    console.log(fetchError);
  }, [fetchError]);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="" breadcrumbItem="Dashboard" />
          <div class="row">
            <div class="col-xl-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-2">WhatsApp Account</h4>
                  <hr
                    className="border-top border-secondary mb-2"
                    style={{ opacity: "0.3" }}
                  />
                  <div className="widget-chart-1">
                    <div className="widget-detail-1 text-center d-flex flex-wrap align-items-center justify-content-between w-full">
                      <i className="bx bx-user display-4"></i>
                      <h2 className="fw-semibold pt-2 mb-1 ml-auto mr-3">
                        {" "}
                        {data.length}{" "}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mt-0 mb-2">Agent Account</h4>
                  <hr
                    className="border-top border-secondary mb-2"
                    style={{ opacity: "0.3" }}
                  />
                  <div className="widget-chart-1">
                    <div className="widget-detail-1 text-center d-flex flex-wrap align-items-center justify-content-between w-full">
                      <i className="bx bx-street-view display-4"></i>
                      <h2 className="fw-semibold pt-0 mb-1 ml-auto mr-3">
                        {dataAgents.length}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Dashboard;
