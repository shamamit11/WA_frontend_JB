import { useFormik } from "formik";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import { addWhatsappAccounts } from "slices/thunk";

const AddAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialValue = location.state ? location.state : {};
  const mode = location.state ? "Edit" : "Add";
  const dispatch = useDispatch();
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const { error, success, loading } = useSelector((state) => ({
    success: state.Whatsapp.success,
  }));

  useEffect(() => {
    if (success) {
      //navigate(-1);
      //navigate("/whatsapp-accounts");
      window.location = "/whatsapp-accounts";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, success]);

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      phone: Yup.string().required("This field is required"),
      code: Yup.string().required("This field is required"),
      name: Yup.string().required("This field is required"),
      port: Yup.string().required("This field is required"),
    }),

    onSubmit: (values) => {
      dispatch(addWhatsappAccounts(values));
    },
  });
  const fileReader = new FileReader();
  const allowedExtensions = [".csv", ".xls"];
  const uploadFormik = useFormik({
    initialValues: {
      csvData: [], // This will store the CSV data
    },
    onSubmit: (values) => {
      const file = values.csvData;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Use FileReader to read the file content
          const content = e.target.result;
          const parsedData = parseCSV(content); // Assuming you have a function to parse CSV content
          const addData = {};
          parsedData.forEach((element, i) => {
            addData.phone = element[0];
            addData.name = element[1];
            addData.code = element[2];
            addData.port = element[3];
            addData.status = element[4];

            if (
              element[0] != "" &&
              element[0] != undefined &&
              element[0] != "Whatsapp"
            ) {
              dispatch(addWhatsappAccounts(addData));
            }
          });
        };
        reader.readAsText(file); // Read the file as text
      }
    },
  });

  const parseCSV = (content) => {
    const parsedData = content.split("\n").map((line) => line.split(","));
    return parsedData;
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Whatsapp Accounts"
            breadcrumbItem={mode + " Whatsapp Account"}
          />
          <Card>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="phone">Whatsapp Number</Label>
                      <Input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder=""
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={
                          formik.touched.phone && formik.errors.phone
                            ? true
                            : false
                        }
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <FormFeedback>{formik.errors.phone}</FormFeedback>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="name">Whatsapp Name</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder=""
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={
                          formik.touched.name && formik.errors.name
                            ? true
                            : false
                        }
                      />
                      {formik.errors.name && formik.touched.name && (
                        <FormFeedback>{formik.errors.name}</FormFeedback>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="code">Whatsapp Code</Label>
                      <Input
                        type="text"
                        id="code"
                        name="code"
                        placeholder=""
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={
                          formik.touched.code && formik.errors.code
                            ? true
                            : false
                        }
                      />
                      {formik.errors.code && formik.touched.code && (
                        <FormFeedback>{formik.errors.code}</FormFeedback>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="port">Proxy IP/Port</Label>
                      <Input
                        type="text"
                        id="port"
                        name="port"
                        placeholder=""
                        value={formik.values.port}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={
                          formik.touched.port && formik.errors.port
                            ? true
                            : false
                        }
                      />
                      {formik.errors.port && formik.touched.port && (
                        <FormFeedback>{formik.errors.port}</FormFeedback>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <Input
                        type="text"
                        name="status"
                        placeholder=""
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={
                          formik.touched.status && formik.errors.status
                            ? true
                            : false
                        }
                      />
                      {formik.errors.status && formik.touched.status && (
                        <FormFeedback>{formik.errors.status}</FormFeedback>
                      )}
                    </FormGroup>

                    <div>
                      <Button type="submit" color="primary">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Col>
                <Col md={6}>
                  <Form onSubmit={uploadFormik.handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="file">Select file (.csv/.xls)</Label>
                      <Input
                        type="file"
                        id="file"
                        name="file"
                        accept=".csv, .xls"
                        onChange={(event) => {
                          uploadFormik.setFieldValue(
                            "csvData",
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={uploadFormik.handleBlur("file")}
                        invalid={
                          uploadFormik.touched.file && uploadFormik.errors.file
                            ? true
                            : false
                        }
                      />
                      {uploadFormik.errors.file &&
                        uploadFormik.touched.file && (
                          <div className="text-danger font-size-10 my-1">
                            {uploadFormik.errors.file}
                            <FormFeedback>
                              {uploadFormik.errors.file}
                            </FormFeedback>
                          </div>
                        )}
                    </FormGroup>

                    <div>
                      <Button type="submit" color="primary">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddAccount;
