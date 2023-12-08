import { Button } from "reactstrap";

const getColumns = (handleEdit, handleDelete, handleAssign) => {
  return [
    // {
    //   Header: "#",
    //   accessor: (row, index) => index + 1, // Index count
    //   Filter: false,
    //   sortType: "asc",
    // },
    {
      Header: "Whatsapp#",
      accessor: "phone",
      Filter: true,
    },
    {
      Header: "Name",
      accessor: "name",
      Filter: false,
    },
    {
      Header: "Code",
      accessor: "code",
      Filter: false,
    },
    {
      Header: "Proxy/port",
      accessor: "port" /*(row) => {
        const ip = row.ip; // Replace "proxy" with the actual property name in your data
        const port = row.port; // Replace "port" with the actual property name in your data
        return `${ip} / ${port}`;
      }*/,
      Filter: false,
    },
    {
      Header: "Status",
      accessor: "status",
      Filter: false,
    },
    {
      Header: "Assigned To",
      accessor: "owner.firstName",
      Filter: false,
    },
    {
      Header: "Action",
      accessor: "",
      Filter: false,
      disableSortBy: true,
      Cell: ({ row }) => (
        <div>
          <Button
            color="secondary"
            className="mx-2"
            onClick={() => handleEdit(row)}
          >
            <i className="fa fa-pencil-alt" />
          </Button>

          <Button color="danger" onClick={() => handleDelete(row)}>
            <i className="fa fa-trash" />
          </Button>
          <Button
            color="success"
            className="mx-2"
            onClick={() => handleAssign(row)}
          >
            <i className="fa fa-users"></i>
          </Button>
        </div>
      ),
    },
  ];
};

export default getColumns;
