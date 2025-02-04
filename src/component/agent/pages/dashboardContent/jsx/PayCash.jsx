import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserIdInput } from "../../../main/jsx/inputFeild/UserId";
import { TextInput } from "../../../../common/TextInput";
import { Button } from "../../../../common/Button";
import style from "../../styles/RecieveCash.module.css";

export const PayCash = () => {
  const { id } = useParams();
  const [userValue, setuserValue] = useState("");
  const [ledger, setledger] = useState("");
  const [note, setnote] = useState("");

  useEffect(() => {
    fetch(``)
      .then((response) => response.json())
      .then((data) => setuserValue(data.value))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  return (
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
          value={ledger}
          onChange={setledger}
        />
      </div>

      <div className={style.row}>
        <label className={style.label}>Note:</label>
        <TextInput placeholder="Enter note" value={note} onChange={setnote} />
      </div>

      <div className={style.buttonContainer}>
        <Button
          label="Save Changes"
          onClick={() => console.log("Changes saved")}
        />
      </div>
    </div>
  );
};
