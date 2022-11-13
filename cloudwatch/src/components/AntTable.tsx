import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';


export type Status = {
  color: string;
  text: string;
};

const statusMap = {
  0: {
    color: 'blue',
    text: 'Healthy',
  },
  1: {
    color: 'green',
    text: 'Optimized',
  },
  2: {
    color: 'volcano',
    text: 'Poor Performance',
  },
  3: {
    color: 'red',
    text: 'Attention Needed',
  },
  4: {
    color: '',
    text: 'Not Configured',
  },
};

export type TableListItem = {
  key: number;
  name: string;
//   cost: string;
  cost: number;
  creator: string;
  status: Status;
  createdAt: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['finance', 'insurance', 'bank'];

for (let i = 0; i < 8; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'ClusterName',
    // cost: Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(Math.floor(Math.random() * 2000)),
    cost: Math.floor(Math.random()*2000),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[Math.floor(Math.random() * 10) % 5],
    createdAt: Date.now() - Math.floor(Math.random() * 100),
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: 'Cluster Name',
    width: 120,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: 'Status',
    width: 120,
    dataIndex: 'status',
    render: (_, record) => <Tag color={record.status.color}>{record.status.text}</Tag>,
  },
  {
    title: 'Cost Per Week',
    width: 120,
    dataIndex: 'cost',
    align: 'right',
    sorter: (a, b) => a.cost - b.cost,
  },

  {
    title: 'Department',
    width: 120,
    dataIndex: 'creator',
    valueEnum: {
      all: { text: 'Show All' },
      finance: { text: 'Finance' },
      insurnace: { text: 'Insurance' },
      bank: { text: 'Banking' },
    },
  },
];

const expandedRowRender = () => {
  const data = [];
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      date: '2022-11-11 23:12:00',
      name: 'WRF Placeholder',
      upgradeNum: 'Upgraded: 56',
    });
  }
  return (
    <ProTable
      columns={[
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },

        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          valueType: 'option',
          render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};

const AntTable = () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: false,
      }}
      expandable={{ expandedRowRender }}
      search={false}
      dateFormatter="string"
      headerTitle="Monitor Boards"
      options={false}
      toolBarRender={() => [
        <Button key="show">Show Log</Button>,
        <Button key="out">
          Export Data
          <DownOutlined />
        </Button>,
        <Button key="primary" type="primary">
          Create Cluster
        </Button>,
      ]}
    />
  );
};

export default AntTable; 