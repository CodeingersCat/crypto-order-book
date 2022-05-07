import { FunctionComponent } from "react";
import { formatNumber } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectAsks, selectBids } from "../Orderbook/orderbookSlice";
// interface SpreadProps{
//     bids: number[][];
//     asks: number[][];
// }

const Spread : FunctionComponent = () => {
    const bids: number[][] = useAppSelector(selectBids)
    const asks: number[][] = useAppSelector(selectAsks)

    const maxBid = (): number => {
        const prices: number[] = bids.map(bid => bid[0])
        return Math.max.apply(Math, prices)
    }

    const minAsk = (): number => {
        const prices: number[] = asks.map(bid => bid[0])
        return Math.min.apply(Math, prices)
    }

    const spreadAmount = () : number => Math.abs(maxBid() - minAsk())

    const spreadPercentage = (spread: number, maxBid: number) : string => `(${((spread*100)/maxBid).toFixed(2)}%)`

    return(
        <div className="spread-container">
            Spread : {formatNumber(spreadAmount())} {spreadPercentage(spreadAmount(), maxBid())}
        </div>
    )
}

export default Spread