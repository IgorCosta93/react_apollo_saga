import React from "react";
import Home from "./homeWrapper/Home";

function DashboardWrapper({ data, history }){

    let props = {
        data: data,
        history: history
    }

    return (
        <Home props={props}/>
    );
}

export default DashboardWrapper;