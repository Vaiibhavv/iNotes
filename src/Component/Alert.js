import React from "react";

export default function Alert(props) {
    //const{msg, type}=props.alert?props.alert:"";
  return (
    <div>
    {props.alert&&
      <div className="alert alert-danger" role="alert">
        {props.alert.msg}
      </div>}
    </div>
  );
}
