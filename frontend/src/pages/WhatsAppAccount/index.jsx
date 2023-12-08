//import components
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteAccountModal from "./delete-account";
//import mockData from "./mock-data";
import getColumns from "./table-column";
import { fetchWhatsAppAccountsList } from "slices/thunk";
import AssignAgentModal from "./assign-agent";

const WhatsappAccounts = () => {
  //meta title
  // document.title = "Data Tables | Skote - React Admin & Dashboard Template";
  const navigate = useNavigate();

  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [deletingData, setDeletingData] = useState({});
  const [displayAssignModal, setDisplayAssignModal] = useState(false);
  const [assignData, setAssignData] = useState({});

  const handleAdd = () => {
    navigate("/add-account", {});
  };
  const handleEdit = (data) => {
    navigate("/add-account", { state: data.original });
  };
  const handleDelete = (data) => {
    setDeletingData(data.original);
    setDisplayDeleteModal(true);
  };

  const handleAssign = (data) => {
    setAssignData(data.original);
    setDisplayAssignModal(true);
  };

  const columns = getColumns(handleEdit, handleDelete, handleAssign);

  const closeDeleteModal = () => {
    setDisplayDeleteModal(false);
  };

  const dispatch = useDispatch();

  const { data, fetchError, fetching } = useSelector((state) => ({
    fetching: state.Whatsapp.fetching,
    data: state.Whatsapp.data,
    fetchError: state.Whatsapp.fetchError,
  }));

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchWhatsAppAccountsList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    console.log(fetchError);
  }, [fetchError]);

  const closeAssignModal = () => {
    setDisplayAssignModal(false);
  };

  return (
    <React.Fragment>
      <DeleteAccountModal
        isOpen={displayDeleteModal}
        closeModal={closeDeleteModal}
        data={deletingData}
      />
      <AssignAgentModal
        isOpen={displayAssignModal}
        closeModal={closeAssignModal}
        selectedAccount={assignData}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="" breadcrumbItem="Whatsapp Accounts" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  {fetching && (
                    <div>
                      <Spinner size="sm" color="light" className="me-2" />
                      Fetching Data...
                    </div>
                  )}
                  {fetchError && <Alert color="danger">{fetchError}</Alert>}

                  {!(fetching || fetchError) && (
                    <TableContainer
                      columns={columns}
                      data={data}
                      isGlobalFilter={true}
                      isAddOptions={true}
                      handleAddOption={handleAdd}
                      customPageSize={10}
                      theadClass="table-light"
                      tableClass="table table-bordered dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                      customPageSizeOption={true}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};
export default WhatsappAccounts;
