import { FunctionComponent } from "react";
import { MOBILE_WIDTH } from "../../../constants";
import "./style.css"

interface TableHeaderProps{
    isReverse?: boolean;
    windowWidth: number
}

const TableHead:FunctionComponent<TableHeaderProps> = ({isReverse = false, windowWidth}) => {
    return (
        <div>
        { windowWidth > MOBILE_WIDTH ? isReverse ? 
        (
            <div className="header-row-red" style={{"borderBottom": "3px solid grey", "marginBottom": "5px"}}>
            <span>PRICE</span>
            <span>SIZE</span>
            <span>TOTAL</span>
            </div>
        ) : 
        (
            <div className="header-row-green" style={{"borderBottom": "3px solid grey", "marginBottom": "5px"}}>
            <span>TOTAL</span>
            <span>SIZE</span>
            <span>PRICE</span>
            </div>
        ) : 
        isReverse ? (
            <div className="header-row-red" style={{"borderBottom": "3px solid grey", "marginBottom": "5px"}}>
            <span>PRICE</span>
            <span>SIZE</span>
            <span>TOTAL</span>
            </div>
        ) : 
        (
            <div className="header-row-green" style={{"borderBottom": "3px solid grey", "marginBottom": "5px"}}>
            <span>PRICE</span>
            <span>SIZE</span>
            <span>TOTAL</span>
            </div>
        )}
        </div>
    )
}   

export default TableHead