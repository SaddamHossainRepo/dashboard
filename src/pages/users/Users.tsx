import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allusers"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/users").then(
  //       (res) => res.json()
  //     ),
  // });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // getAllProducts({});
    axios.get('http://localhost:9000/v1/users/').then((res) => {
    // axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
      setUsers(res.data.data);
      // setProducts(res.data)
      // setPage(res.data.page)
      console.log('users', res.data.data);
      // console.log('current page', res.data.page);
    });
  }, []);

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
