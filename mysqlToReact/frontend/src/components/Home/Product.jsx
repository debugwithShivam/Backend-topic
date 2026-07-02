import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Product() {
  async function getProductData() {
    try {
      let response = await axios.get("http://localhost:4876/auth/getProduct");
      return response.data.data
    } catch (err) {
      console.log("Data And Found Because or this Error", err);
    }
  }

  const {data,isLoading, error} = useQuery({
    queryKey:'productData',
    queryFn:getProductData
  })
  console.log(data)

  return <div>
    
  </div>;
}
