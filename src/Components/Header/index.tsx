import React, { FunctionComponent } from 'react';
import { MOBILE_WIDTH } from '../../constants';
import "./style.css"
import GroupingSelectBox from "../GroupingSelectBox";
import Spread from '../Spread';

interface HeaderProps {
  options: number[];
  windowWidth: number;
}

const Header: FunctionComponent<HeaderProps> = ({options, windowWidth}) => {
    return (
    <div className='header-container'>
      <h3>Crypto Watch</h3>
      {windowWidth>MOBILE_WIDTH ?  <Spread/> : ""}
      <GroupingSelectBox options={options}/>
    </div>
  );
};

export default Header;