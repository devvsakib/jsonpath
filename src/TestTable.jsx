import { Table, Checkbox } from "antd";
import { useState } from "react";

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}

const TestTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelect = (record, selected) => {
    if (selected) {
      setSelectedRowKeys((keys) => [...keys, record.key]);
    } else {
      setSelectedRowKeys((keys) => {
        const index = keys.indexOf(record.key);
        return [...keys.slice(0, index), ...keys.slice(index + 1)];
      });
    }
  };

  const toggleSelectAll = () => {
    setSelectedRowKeys((keys) =>
      keys.length === data.length ? [] : data.map((r) => r.key)
    );
  };

  const headerCheckbox = (
    <Checkbox
      checked={selectedRowKeys.length}
      indeterminate={
        selectedRowKeys.length > 0 && selectedRowKeys.length < data.length
      }
      onChange={toggleSelectAll}
    />
  );

  const rowSelection = {
    selectedRowKeys,
    type: "checkbox",
    fixed: true,
    onSelect: handleSelect,
    columnTitle: headerCheckbox
    //onSelectAll: this.handleSelectAll
  };
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey={(record) => record.key}
        dataSource={data}
        pagination={{
          position: ["topRight"],
          size: "medium",
          //current: currentPage,
          //onChange: (page) => setCurrentPage(page),
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"]
        }}
      />
    </div>
  );
};

export default TestTable
