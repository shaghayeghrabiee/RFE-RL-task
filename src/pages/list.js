import React from 'react';
import './list.css';

const List = ({ list, onclick }) => {
  return (
    <li className="inputItem" onClick={onclick}>
      {list}
    </li>
  );
};

export default List