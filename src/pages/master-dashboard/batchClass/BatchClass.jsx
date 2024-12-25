import React, { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";
import BatchTable from '../batchClass/batchClassTable/batchTable/BatchTable';
import ClassTable from '../batchClass/batchClassTable/ClassTable/ClassTable'
import Class from "./class/Class";
import Header from "../../../components/header/Header";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./batchClass.scss";

function BatchClass() {
  const { navButtonClick } = useContext(UserContext);
  const [key, setKey] = useState('batch');
  
  return (
    <div className={`dashboard ${navButtonClick && "dashboard-full"} batch-table batch-class`}>
      <Header />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="main-plan-tabs pt-3 border-0"
      >
        <Tab eventKey="batch" title="Batch">
          <BatchTable/>
        </Tab>
        <Tab eventKey="class" title="Class">
          <ClassTable />
        </Tab>
      </Tabs>
    </div>
  );
}

export default BatchClass;
