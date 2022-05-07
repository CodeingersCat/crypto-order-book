import { ChangeEvent, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { selectGrouping, setGrouping } from "../Orderbook/orderbookSlice";
import "./style.css"

interface GroupingSelectBoxProps {
    options: number[];
}


const GroupingSelectBox: FunctionComponent<GroupingSelectBoxProps> = ({options}) => {

    const groupingSize: number = useAppSelector(selectGrouping);
    const dispatch = useDispatch(); 

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setGrouping(Number(event.target.value)))
    } 

    return(
        <div>
            <select data-testid="groupings" name="groupings" onChange={handleChange} defaultValue={groupingSize} className="select-option">
                {options.map((option, idx) => <option key={idx} value={option} className="option">Group {option}</option>)}
            </select>
        </div>
    )
}

export default GroupingSelectBox;