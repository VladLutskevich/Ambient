import React, { useState } from "react";
import { useAsync } from "react-use";
import ReactDOM from "react-dom";
import "antd/dist/antd.min.css";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { BaseStation, RequestService } from "../../services/requestService";
import { SortOrder } from "antd/lib/table/interface";

const BaseStations = function () {
  const requestService = new RequestService();

  const [baseStationsData, setBaseStationsData] = useState([] as BaseStation[]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const rebuildData = (data) => {
    let tmpData = JSON.parse(JSON.stringify(data));
    console.log(tmpData);
    tmpData.forEach((item) => {
      switch (item.BS_type) {
        case 0:
          item.BS_type = "Unitess Ambient BS";
          break;
        case 1:
          item.BS_type = "Unitess Ambient Receiver";
          break;
        case 2:
          item.BS_type = "Unitess Ambient Bridge (мобильная базовая станция)";
          break;
      }

      switch (item.BS_pwr_type) {
        case 0:
          item.BS_pwr_type = "внут. аккумулятор (нештатный режим)";
          break;
        case 1:
          item.BS_pwr_type = "внешнее питание (штатное)";
          break;
        case 2:
          item.BS_pwr_type = "PoE (штатное питание по Ethernet-кабелю)";
          break;
      }

      item.BS_trip_id = item.BS_trip_id ? "В пути" : "На стоянке";

      item.status = `Сигнал: ${(item.BS_gsm_signal && item.BS_gsm_signal > 20) ? 'Сильный' : 'Слабый'},
      Заряжается: ${item.BS_bat_chrg ? "Да" : "Нет" },
      Батарея: ${item.batlevel}%,
      Обновление: ${item.BS_New_Sett_Apply ? 'Да' : 'Нет'}
      `;
    });
    setBaseStationsData(tmpData);
  };

  useAsync(async () => {
    const data = await requestService.getBaseStations();
    rebuildData(data);
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
  };

  let searchInput;
  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });

              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "#",
      dataIndex: "Id_BS",
      key: "Id_BS",
      width: "3%",
      ...getColumnSearchProps("Id"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "8%",
      ...getColumnSearchProps("Status"),
    },
    {
      title: "Name",
      dataIndex: "BS_name",
      key: "BS_name",
      width: "7%",
      ...getColumnSearchProps("name"),
      sorter: (a: any, b: any) => a.BS_name.localeCompare(b.BS_name),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "ID",
      dataIndex: "BS_MAC",
      key: "BS_MAC",
      width: "7%",
      ...getColumnSearchProps("ID"),
      sorter: (a: any, b: any) => a.BS_MAC.localeCompare(b.BS_MAC),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "Type",
      dataIndex: "BS_type",
      key: "BS_type",
      width: "10%",
      ...getColumnSearchProps("Type"),
      sorter: (a: any, b: any) => a.BS_type.localeCompare(b.BS_type),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "Car Number",
      dataIndex: ["car", "number"],
      key: "number",
      width: "7%",
      ...getColumnSearchProps("Car Number"),
      sorter: (a: any, b: any) => a.car.number.localeCompare(b.car.number),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "Last update",
      dataIndex: "BS_last_update",
      key: "BS_last_update",
      width: "10%",
      ...getColumnSearchProps("Last update"),
      sorter: (a: any, b: any) =>
        a.BS_last_update.localeCompare(b.BS_last_update),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "Power Type",
      dataIndex: "BS_pwr_type",
      key: "BS_pwr_type",
      width: "10%",
      ...getColumnSearchProps("Power Type"),
      sorter: (a: any, b: any) => a.BS_pwr_type.localeCompare(b.BS_pwr_type),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "GSM",
      dataIndex: "BS_gsm_num",
      key: "BS_gsm_num",
      width: "8%",
      ...getColumnSearchProps("GSM"),
      sorter: (a: any, b: any) => a.BS_gsm_num.localeCompare(b.BS_gsm_num),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "HEX",
      dataIndex: "BS_rf_SSID",
      key: "BS_rf_SSID",
      width: "7%",
      ...getColumnSearchProps("HEX"),
      sorter: (a: any, b: any) => a.BS_rf_SSID.localeCompare(b.BS_rf_SSID),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "Latitude",
      dataIndex: "BS_lat",
      key: "BS_lat",
      width: "7%",
      ...getColumnSearchProps("Latitude"),
      sorter: (a: any, b: any) => a.BS_lat.localeCompare(b.BS_lat),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "Longitude",
      dataIndex: "BS_long",
      key: "BS_long",
      width: "7%",
      ...getColumnSearchProps("Longitude"),
      sorter: (a: any, b: any) => a.BS_long.localeCompare(b.BS_long),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "Current time",
      dataIndex: "BS_datetime",
      key: "BS_datetime",
      width: "10%",
      ...getColumnSearchProps("Current time"),
      sorter: (a: any, b: any) => a.BS_datetime.localeCompare(b.BS_datetime),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "Work time",
      dataIndex: "BS_uptime",
      key: "BS_uptime",
      width: "10%",
      ...getColumnSearchProps("Work time"),
      sorter: (a: any, b: any) => a.BS_uptime.localeCompare(b.BS_uptime),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
    {
      title: "Activity",
      dataIndex: "BS_trip_id",
      key: "BS_trip_id",
      width: "10%",
      ...getColumnSearchProps("Activity"),
      sorter: (a: any, b: any) =>
        a.BS_trip_id.localeCompare(b.BS_trip_id),
      sortDirections: ["descend", "ascend"] as SortOrder[],
    },
  ];

  return <Table columns={columns} dataSource={baseStationsData} />;
};

export default BaseStations;
