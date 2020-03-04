import React from 'react';
import {Button} from "antd";

const SideBar = (props) => {

  const {onSort} = props;
  return (
    <div>
      <Button onClick={onSort}>Sort</Button>
    </div>
  )
};

export default SideBar;