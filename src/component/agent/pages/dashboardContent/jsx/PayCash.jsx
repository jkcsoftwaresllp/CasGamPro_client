import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserIdInput } from "../../../main/jsx/inputFeild/UserId";
import { TextInput } from "../../../../common/TextInput";
import { Button } from "../../../../common/Button";
import style from "../../styles/RecieveCash.module.css";
import { apiCall } from "../../../../common/apiCall";

export const PayCash = () => {
  const { id } = useParams();
  const [userValue, setuserValue] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setnote] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    console.log("API not connected");

    // const response = await apiCall(
    //   "/auth-api/agent/walletTransaction",
    //   "POST",
    //   { userId: id, type: "withdrawal", amount, note }
    // );
    // if (response && response.uniqueCode === "CGP0062") {
    //   navigate(-1);
    //   console.log("API Response: ", response);
    // } else console.error("API Error:", response.data);
  };

  return (
    <div className={style.containerWrapper}>
      <div className={style.container}>
        <h1 className={style.heading}>Pay Cash to user</h1>
        <div className={style.row}>
          <UserIdInput value={id} />
        </div>

        <div className={style.row}>
          <label className={style.label}>Rs. Exposure:</label>
          <TextInput value={userValue} readOnly={true} />
        </div>

        <div className={style.row}>
          <label className={style.label}>Update Ledger:</label>
          <TextInput
            placeholder="Enter value"
            value={amount}
            onChange={setAmount}
          />
        </div>

        <div className={style.row}>
          <label className={style.label}>Note:</label>
          <TextInput placeholder="Enter note" value={note} onChange={setnote} />
        </div>

        <div className={style.buttonContainer}>
          <Button label="Save Changes" onClick={fetchData} />
        </div>
      </div>
    </div>
  );
};
