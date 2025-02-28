import React, { useCallback, useEffect } from "react";
import { ReusableTable } from "../../components";

import { useDispatch, useSelector } from "react-redux";

import {
  useGetOrdersMutation,
  useTransitOrderMutation,
} from "../../actions/OrderAction";
import { selectOrders, setOrder } from "../../reducers/OrderReducers";
import { toast } from "react-toastify";

export default function Order({ header }) {
  const [getOrderMutation] = useGetOrdersMutation();
  const [transitOrderMutation] = useTransitOrderMutation();
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
        const pendindData = res.data.filter(
          (order) => order.orders_status === "Packaging"
        );
        dispatch(setOrder(pendindData));
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  }, [dispatch, getOrderMutation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTransit = async (row) => {
    const id = row.id;
    try {
      await transitOrderMutation(id);
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
        onTransit={handleTransit}
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
