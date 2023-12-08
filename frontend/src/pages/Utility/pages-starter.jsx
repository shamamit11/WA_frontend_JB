import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

const PagesStarter = () => {
  //meta title
  document.title = "Stater Page | ";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Utility" breadcrumbItem="Starter Page" />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PagesStarter;
