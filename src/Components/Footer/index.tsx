import { FunctionComponent } from "react";
import "./styles.css"

interface FooterProps{
    toggleFeedChange: () => void;
    market: string;
}

const Footer : FunctionComponent<FooterProps> = ({toggleFeedChange,  market}) => {
    return(
        <div className="footer-container">
            <div className="buttons">
                <button className="toggle" onClick={toggleFeedChange}>Toggle Feed</button>
            </div>
            <div className="div market">Selected Market : {market}</div>
        </div>
    )
}

export default Footer;