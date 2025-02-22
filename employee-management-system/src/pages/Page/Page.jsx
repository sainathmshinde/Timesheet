import React from "react";
import WithLayout from "../../components/layout/WithLayout";
import PageTable from "../../datatables/PageTable";

export const Page = () => {
  return (
    <div>
      <PageTable />
    </div>
  );
};
export default WithLayout(Page);
