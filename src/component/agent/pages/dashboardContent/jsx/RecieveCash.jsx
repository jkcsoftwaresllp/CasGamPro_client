import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserIdInput } from "../../../main/jsx/inputFeild/UserId";
import { TextInput } from "../../../../common/TextInput";
import { Button } from "../../../../common/Button";
import style from "../../styles/RecieveCash.module.css";
import { apiCall } from "../../../../common/apiCall";
import { getToastTypes, showToast } from "../../../../common/showToast";

export const ReceiveCash = () => {
  const { id } = useParams(); // Fetch the user ID from the URL
  const [amount, setAmount] = useState("");
  const [exposure, setExposure] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExposure = async () => {
      const response = await apiCall(
        `/auth-api/panel/get-coins-exposure/${id}`,
        "GET"
      );
      console.log("API call for Exposure", response);

      if (response && response.uniqueCode === "CGP0153") {
        setExposure(response.data.exposure);
      }
    };
    fetchExposure();
  }, []);

  const saveChanges = async () => {
    const response = await apiCall(
      "/auth-api/panel/exposure-transection",
      "POST",
      {
        userId: id,
        amount,
        note,
        type: "receive",
      }
    );
    console.log("Response for Recieve Cash", response);

    if (response && response.uniqueCode === "CGP0065") {
      console.log("API Response: ", response);
      showToast(getToastTypes.type1, response.message);
      navigate(-1);
    } else {
      showToast(getToastTypes.type4, "Error in receiving cash Updation.");
    }
  };

  return (
    <div className={style.containerWrapper}>
      <div className={style.container}>
        <h1 className={style.heading}>Receive Cash from user</h1>
        <div className={style.row}>
          <UserIdInput value={id} />
        </div>

        <div className={style.row}>
          <label className={style.label}>Rs. Exposure:</label>
          <TextInput placeholder={exposure} readOnly={true} />
        </div>

        <div className={style.row}>
          <label className={style.label}>Update Ledger:</label>
          <TextInput placeholder="Enter value" onChange={setAmount} />
        </div>

        <div className={style.row}>
          <label className={style.label}>Note:</label>
          <TextInput placeholder="Enter note" onChange={setNote} />
        </div>

        <div className={style.buttonContainer}>
          <Button label="Save Changes" onClick={saveChanges} />
        </div>
      </div>
    </div>
  );
};
