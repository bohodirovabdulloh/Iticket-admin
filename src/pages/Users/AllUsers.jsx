import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table/Table";

const AllUsers = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  const columns = [
    { header: "ID", accessor: "_id" },
    { header: "Name", accessor: (user) => `${user.firstName} ${user.lastName}` },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phoneNumber" },
  ];

  return (
    <div>
      <Table data={users} loading={loading} error={error} columns={columns} />
    </div>
  );
};

export default AllUsers;
