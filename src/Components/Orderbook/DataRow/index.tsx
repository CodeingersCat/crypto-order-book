import { FunctionComponent } from "react";
import { MOBILE_WIDTH } from "../../../constants";
import "../TableHead/style.css"

interface DataProps{
    total: string;
    price: string;
    size: string;
    isReverse?: boolean;
    windowWidth: number;
    depth:number;
}

const DataRow: FunctionComponent<DataProps>  = ({total, size, price, isReverse=false, windowWidth, depth}) => {
    return (
        <div>
        { windowWidth > MOBILE_WIDTH  ? isReverse ? 
        (
            <div className="header-row-red">
            <div className="color-red" style={{
                "width": `${depth}%`
            }}/>
            <span style={{"color": "rgb(156, 20, 20)"}}>{price}</span>
            <span>{size}</span>
            <span>{total}</span>
            </div>
        ) : 
        (
            <div className="header-row-green">
            <div className="color-green" style={{
                "width": `${depth}%`
            }}/>
            <span>{total}</span>
            <span>{size}</span>
            <span style={{"color": "rgb(48, 215, 48)"}}>{price}</span>
            </div>
        ) : 
        isReverse ? (
            <div className="header-row-red">
            <div className="color-red" style={{
                "width": `${depth}%`
            }}/>
            <span style={{"color": "rgb(156, 20, 20)"}}>{price}</span>
            <span>{size}</span>
            <span>{total}</span>
            </div>
        ) :
        (
            <div className="header-row-green">
            <div className="color-green" style={{
                "width": `${depth}%`
            }}/>
            <span style={{"color": "rgb(48, 215, 48)"}}>{price}</span>
            <span>{size}</span>
            <span>{total}</span>
            </div>
        )
        }
        </div>
    )
}

export default DataRow