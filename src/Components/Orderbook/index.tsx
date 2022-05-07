import React, { FunctionComponent, useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { ProductsMap } from "../../App";
import { MOBILE_WIDTH, ORDERBOOK_LEVELS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Spread from "../Spread";
import { addAsks, addBids, addExistingState, selectAsks, selectBids } from "./orderbookSlice";
import TableHead from "./TableHead";
import "./style.css"
import { formatNumber } from "../../helpers";
import DataRow from "./DataRow";

const WSS_URL: string = "wss://www.cryptofacilities.com/ws/v1";

export enum OrderTypes{
    BIDS,
    ASKS
}

interface OrderBookProps {
    windowWidth: number;
    productId: string;
}

interface Delta {
    bids: number[][];
    asks: number[][];   
}

let currentBids: number[][] = []
let currentAsks: number[][] = []

const OrderBook: FunctionComponent<OrderBookProps> = ({windowWidth, productId}) => {
    const bids: number[][] = useAppSelector(selectBids)
    const asks: number[][] = useAppSelector(selectAsks)
    const dispatch = useAppDispatch()
    const [isFeedKilled, setIsFeedKilled] = useState(false);

    const {sendJsonMessage, getWebSocket, } = useWebSocket(WSS_URL, {
            onOpen: () => console.log('WebSocket connection opened.'),
            onClose: () => console.log('WebSocket connection closed.'),
            shouldReconnect: (CloseEvent) => true,
            onMessage: (event: WebSocketEventMap['message']) =>{
                processMessages(event)
            }
    })

    const toggleFeedKill = () => {
        setIsFeedKilled(!isFeedKilled)
     }

    const processMessages = (event: { data: string }) => {
        const response = JSON.parse(event.data);
        if (response.numLevels) {
          dispatch(addExistingState(response));
        } else process(response);
    };

    const process = (data: Delta) => {
        if(data?.bids?.length > 0){
            currentBids = [...currentBids, ...data.bids]
            
            if(currentBids.length > ORDERBOOK_LEVELS){
                dispatch(addBids(currentBids))
                currentBids = []
            }
        }

        if(data?.asks?.length > 0){
            currentAsks = [...currentAsks, ...data.asks]
            
            if(currentAsks.length > ORDERBOOK_LEVELS){
                dispatch(addAsks(currentAsks))
                currentAsks = []
            }
        }
    }

    const formatPrice = (arg: number): string => {
        return arg.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })
    };

    const priceLevels = (levels: number[][], orderType: OrderTypes = OrderTypes.BIDS) : React.ReactNode => {
        const sortedPrices : number[][] = [...levels].sort((currentLvl: number[], nextLvl: number[]) : number => {
            if(orderType === OrderTypes.BIDS || windowWidth < MOBILE_WIDTH){
                return (nextLvl[0] - currentLvl[0])
            }else return (currentLvl[0] - nextLvl[0])
        })

        return(
            sortedPrices.map((lvl, id) => {
                const calculatedTotal: number = lvl[2];
                const total: string = formatNumber(calculatedTotal);
                const depth = lvl[3];
                const size: string = formatNumber(lvl[1]);
                const price: string = formatPrice(lvl[0]);

                return(
                    <DataRow price={price} size={size} total={total} windowWidth={windowWidth} isReverse={orderType === OrderTypes.ASKS} key={id} depth={depth}/>
                )
            })
        )

    }

    useEffect(() => {
        function connect(product : string) {
            const subscribeMessage = {
                event: 'subscribe',
                feed: 'book_ui_1',
                product_ids: ["PI_XBTUSD"]
            };
            sendJsonMessage(subscribeMessage);

            
            const unsubscribeMessage = {
                event: 'unsubscribe',
                feed: 'book_ui_1',
                product_ids: [ProductsMap[product]]
            };
            sendJsonMessage(unsubscribeMessage);
        }

        if(isFeedKilled){
            getWebSocket()?.close()
        }else{
            connect(productId)    
        }
    }, [getWebSocket, isFeedKilled, sendJsonMessage, productId])

    return(
        <div> 
            {bids.length && asks.length ?
            (<div className="whole-book">
                <div className="green-table-container">
                    <div className="table-green"><TableHead  windowWidth={windowWidth}/></div>
                    <div className="table-green">{priceLevels(bids, OrderTypes.BIDS)}</div> 
                </div>
                {windowWidth < MOBILE_WIDTH ? <Spread/> : ""}
                <div className="red-table-container">
                    <div className="table-red"><TableHead windowWidth={windowWidth}/></div>
                    <div className="table-red">{priceLevels(asks, OrderTypes.ASKS)}</div>
                </div>
                
            </div>)
            : <>Loading</>}
            <div className="killswitch"><button className="kill" onClick={toggleFeedKill} style={{
                    "backgroundColor": isFeedKilled ? "grey" : "red"
                }}>{isFeedKilled ? "Renew Feed" : "Kill Feed"}</button></div>
        </div>
    )

}

export default OrderBook
