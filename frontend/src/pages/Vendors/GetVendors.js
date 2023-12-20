import React, { useCallback, useEffect, useState } from "react";
import { useGetVendorsMutation } from "../../actions/VendorAction";
import { useDispatch, useSelector } from "react-redux";
import { selectVendors, setVendor } from "../../reducers/VendorReducer";
import { ReusableTable } from "../../components";

export default function GetVendors() {
  const [loading, setLoading] = useState(false);
  const [getVendors] = useGetVendorsMutation();
  // Get Vendors from the store
  const vendorData = useSelector(selectVendors);
  const dispatch = useDispatch();

  // FUNCTION TO FETCH DATA
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getVendors();
      console.log(res);
      if (!res.data) {
        console.log("Failed to get vendors");
      } else {
        // Dispatch the vendors to store them in the store
        dispatch(setVendor(res.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, getVendors]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(vendorData);

  return (
   <>
       <ReusableTable
        columns={[
          "id",
          "businessName",
          "phoneNumber",
          "companyAddress",
          "companyEmail",
          "streetAddress",
          "website",
          "city",
          "kraPin",
        ]}
        data={vendorData}
     
        itemsPerPage={10}
        isLoading={loading}
        // isError={errMsg}
        header="Vendors Management"
    
        columnMapping={{
          id: "ID",
          businessName: "Company Name",
          email: "Email",
          Idnumber: "passport/Id No.",
          streetAddress: "Street Address",
          website: "Website",
          phoneNumber: "Phone No.",
          kraPin: "KRA",
          Image: "Avatar",
        }}
      />
   </>
 
  );
}
