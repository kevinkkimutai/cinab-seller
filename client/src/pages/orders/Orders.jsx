import React, { useCallback, useEffect, useState } from "react";
import { ReusableTable } from "../../components";

import { useDispatch, useSelector } from "react-redux";

import {
  useGetOrdersMutation,
  usePackageOrderMutation,
  useRejectOrderMutation,
} from "../../actions/OrderAction";
import { selectOrders, setOrder } from "../../reducers/OrderReducers";
import { toast } from "react-toastify";

export default function Order({ header }) {
  const [getOrderMutation] = useGetOrdersMutation();
  const [packageMutation] = usePackageOrderMutation();
  const [rejectOrderMutation] = useRejectOrderMutation();
  // Get Order from the store
  const orderData = useSelector(selectOrders);
  const dispatch = useDispatch();
  // FUNCTION TO FETCH DATA
  const fetchData = useCallback(async () => {
    try {
      const res = await getOrderMutation();
      console.log(res);
      if (!res.data) {
        console.log("Failed to get Order");
      } else {
        // Dispatch the Order to store them in the store.

        dispatch(setOrder(res.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  }, [dispatch, getOrderMutation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePackage = async (row) => {
    const id = row.id;
    try {
      await packageMutation(id);
      toast.success("Packaged successfully");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to package the order");
    }
    console.log("Clicked");
  };

  const handleReject = async (row) => {
    const id = row.id;
    try {
      console.log(id);
      await rejectOrderMutation(id);
      toast.success("Packaged successfully");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to package the order");
    }
    console.log("Clicked");
  };

  return (
    <>
      <ReusableTable
        columns={["image", "name", "orders_status", "payment_status"]}
        data={orderData}
        header={header}
        itemsPerPage={10}
        // isLoading={loading}
        actions={true}
        onVendorAction={true}
        onPackage={handlePackage}
        prReject={handleReject}
        columnMapping={{
          Image: "Product Image",
          name: "Product Name",
          orders_status: "Status",
          payment_status: "Payment Status",
          Quantity: "qty",
        }}
      />
    </>
  );
}
