import React, { useEffect, useState } from "react";
import useApiRequest from "../../hooks/useApiRequest";
import Table from "../../components/Table/Table";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const {
    loading: usersLoading,
    error: usersError,
    sendRequest: fetchUsers,
    data: responseData,
  } = useApiRequest();

  useEffect(() => {
    fetchUsers("https://dummyjson.com/users", "GET");
  }, [fetchUsers]);

  useEffect(() => {
    if (responseData) {
      setUsers(responseData.users);
    }
  }, [responseData]);

  return (
    <div>
      <Table
        data={users}
        loading={usersLoading}
        error={usersError}
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Name", accessor: (user) => `${user.firstName} ${user.lastName}` },
          { header: "Email", accessor: "email" },
          { header: "Phone", accessor: "phone" },
          { header: "Age", accessor: "age" },
          { header: "Gender", accessor: "gender" },
          { header: "Blood Group", accessor: "bloodGroup" },
          { header: "Address", accessor: (user) => `${user.address.city}, ${user.address.state}` },
        ]}
      />
    </div>
  );
};

export default AllUsers;
