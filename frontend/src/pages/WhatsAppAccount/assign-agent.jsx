import SubmitButton from "Components/submitButton";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
import { fetchAgentsList } from "slices/thunk";
import { assignAgent } from "slices/thunk";
import {
  Alert,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { editAgent } from "slices/thunk";
import * as Yup from "yup";

const AssignAgentModal = ({ isOpen, closeModal, selectedAccount }) => {
  const dispatch = useDispatch();

  const selectedAccountId = selectedAccount.id;
  localStorage.setItem("selectedAccountId", JSON.stringify(selectedAccountId));
  const { error, success, loading, dataAgents, successAssign } = useSelector(
    (state) => ({
      error: state.Agents.error,
      success: state.Agents.success,
      loading: state.Agents.loading,
      dataAgents: state.Agents.data,
      successAssign: state.Whatsapp.success,
    })
  );

  useEffect(() => {
    if (dataAgents.length === 0) {
      dispatch(fetchAgentsList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (successAssign) {
      closeModal();
      window.location = "/whatsapp-accounts";
      console.log("render");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successAssign]);

  const handleAdd = () => {};

  const handleSelect = (selectedAgent, test) => {
    const editedData = {};
    editedData.ownerId = selectedAgent.id;
    const account_id = JSON.parse(localStorage.getItem("selectedAccountId"));
    //dispatch(assignAgent("0a871853-2e81-4fd1-bb5c-bba87f1a881d", editedData));
    dispatch(assignAgent(account_id, editedData));
  };

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        Filter: false,
        sortType: "basic",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        Filter: false,
        sortType: "basic",
      },
      {
        Header: "Action",
        accessor: (row) => (
          <>
            <button
              type="button"
              className="btn btn-light btn-sm mx-1" // Apply horizontal margin when stacked
              onClick={(e) => {
                e.preventDefault();
                handleSelect(row, selectedAccount);
                return false;
              }}
            >
              <i className="bx bx-Save p-1"></i> Select
            </button>
          </>
        ),
        Filter: false,
        disableSortBy: true,
      },
    ],
    []
  );

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      tabIndex={-1}
      backdrop="static"
    >
      <div className="modal-content">
        <ModalHeader toggle={closeModal}>Assign Agent</ModalHeader>
        {/* <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault();
            return false;
          }}
        > */}
        <ModalBody>
          <div>
            <TableContainer
              columns={columns}
              data={dataAgents}
              isGlobalFilter={false}
              isAddOptions={false}
              customPageSize={10}
              theadClass="table-light"
              tableClass="table table-bordered dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
              customPageSizeOption={false}
            />
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
        {/* </Form> */}
      </div>
    </Modal>
  );
};

export default AssignAgentModal;
