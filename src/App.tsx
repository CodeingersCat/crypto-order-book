import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import "./Styles/Main.css"
import OrderBook from './Components/Orderbook';
import Footer from './Components/Footer';
import { clearOrdersState } from './Components/Orderbook/orderbookSlice';
import { useAppDispatch } from './hooks';
import Loader from './Components/Loader';

export const ProductIds = {
  XBTUSD: 'PI_XBTUSD',
  ETHUSD: 'PI_ETHUSD'
};

const options: any = {
  PI_XBTUSD: [0.5, 1, 2.5],
  PI_ETHUSD: [0.05, 0.1, 0.25]
};

export const ProductsMap: any = {
  "PI_XBTUSD": "PI_ETHUSD",
  "PI_ETHUSD": "PI_XBTUSD",
}

function App() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [productId, setProductId] = useState(ProductIds.XBTUSD);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const dispatch = useAppDispatch();

  //Window width
  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    }
    setIsPageVisible(true)
    setWindowWidth(window.innerWidth);
  }, [isPageVisible]);

  //Page visibility
  useEffect(() => {
    let hidden: string = "";
    let visibilityChange: string = "";

    if(typeof document.hidden !== 'undefined'){
      hidden = "hidden"
      visibilityChange = "visibilitychange"
    }else { // @ts-ignore
      if (typeof document.msHidden !== 'undefined') { //opera and firefox support
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
      } else { // @ts-ignore
        if (typeof document.webkitHidden !== 'undefined') {
          hidden = 'webkitHidden';
          visibilityChange = 'webkitvisibilitychange';
        }
      }
    };

    const handleVisibilityChange = () => {
      const isHidden = document['hidden']
      if(isHidden){
        document.title = 'Paused';
        setIsPageVisible(false);  
      }else{
        document.title = 'Live crypto';
        setIsPageVisible(true);
      }
    };
    
    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === 'undefined' || hidden === '') {
      console.log('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.');
    } else {
      document.addEventListener(visibilityChange, handleVisibilityChange)
    }

  });
  
  const toggleFeedChange = () => {
    console.log("Feed change");
    dispatch(clearOrdersState());
    setProductId(ProductsMap[productId]);
    setIsPageVisible(false)
  }



  return (
    <>
    {isPageVisible  ? <div className="container-whole"> 
      <Header windowWidth={windowWidth} options={options[productId]} />
      <OrderBook windowWidth={windowWidth} productId={ProductIds.XBTUSD}/> 
      <Footer toggleFeedChange={toggleFeedChange} market={productId}/>
    </div> 
    : <Loader/>}
    </>
  );
}

export default App;
