import React, { useEffect, useState } from 'react'
import axios from "axios";

const HomePage = () => {

  const authentication = () => {
    const token = localStorage.getItem('token');
    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: ``,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+ token
        },
    })
      .then((res) => {
        console.log("Authentication response", res.data);
        if(res.data.status === "ok" ) {
          console.log("Successfully authenticated");
      } else {
        console.log("Unsuccessfully authenticated");
        localStorage.removeItem('token');
      }
      })
      .catch((error) => {
        console.log("API Error", error);
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
  }

  useEffect(() => {
    authentication();
  }, []);

  return (
    <>
    <div>HomePage</div>

    </>
  )
}

export default HomePage