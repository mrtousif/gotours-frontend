import React from "react";
import "./alert.css";

export default function Alert({ delay, type, message }) {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, delay);
    }, [delay]);

    return visible ? <div className={`alert alert--${type}`}>{message}</div> : <div />;
}
