import { useEffect, useState } from "react";
import { InputBox } from "../../../../style/global";
import { AddBtn, CalcForm, EndBtn, InputScroll, RemoveBtn } from "./style";
import useGetPayments, {
  PayDataType,
} from "../../../../hooks/services/queries/useGetPayments";
import { useParams } from "react-router-dom";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/fbInstance";

import Swal from "sweetalert2";

interface AddDataType {
  addPayName?: string;
  addPay?: string;
}

type Props = {
  closeModal?: () => void;
};

const PayCalc = ({ closeModal }: Props) => {
  const param = useParams();
  const paymentId = param.id;
  const addData = [
    {
      id: Date.now(),
      addPayName: "",
      addPay: "",
    },
  ];

  const { data, error, isLoading } = useGetPayments();
  const [calcData, setCalcData] = useState<PayDataType[]>([]);
  const [initialInputBoxes, setInitialInputBoxes] = useState<AddDataType[]>([]);
  const [inputBoxes, setInputBoxes] = useState(addData);
  const [dynamicPay, setDynamicPay] = useState("");
  const [minMoney, setMinMoney] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (data) {
      setCalcData(data);
      const payment = data.find((item) => item.id === paymentId);

      if (payment) {
        setDynamicPay(payment.minMoney || "");
        setMinMoney(payment.minMoney || "");
        setInitialInputBoxes(payment.paymentArr || []);
        setInputBoxes([]);
      }
    }
  }, [data, paymentId]);

  useEffect(() => {
    if (!hasChanges) return;

    const totalAddPay = inputBoxes.reduce((total, item) => {
      return total + parseFloat((item.addPay || "0").replace(/,/g, ""));
    }, 0);
    const dynamicPayValue = parseFloat((dynamicPay || "0").replace(/,/g, ""));
    const resultValue = dynamicPayValue - totalAddPay;
    setMinMoney(resultValue.toLocaleString());
  }, [inputBoxes, dynamicPay, hasChanges]);

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAddClick = () => {
    setInputBoxes([
      ...inputBoxes,
      { id: Date.now(), addPayName: "", addPay: "" },
    ]);
    setHasChanges(true);
  };

  const handleRemoveClick = (id: number) => {
    setInputBoxes(inputBoxes.filter((box) => box.id !== id));
    setHasChanges(true);
  };

  const handleInputChange = (id: number, name: string, value: string) => {
    if (name === "addPay") {
      value = formatNumber(value.replace(/,/g, ""));
    }
    setInputBoxes(
      inputBoxes.map((box) => (box.id === id ? { ...box, [name]: value } : box))
    );
    setHasChanges(true);
  };

  const CalcSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const addPayData: AddDataType[] = inputBoxes.map((box) => ({
      addPayName: box.addPayName,
      addPay: box.addPay,
    }));

    try {
      const paymentDoc = doc(db, "payments", paymentId as string);
      const paymentSnapshot = await getDoc(paymentDoc);

      if (!paymentSnapshot.exists()) {
        console.error("No such document!");
        return;
      }

      const currentData = paymentSnapshot.data();
      const updatedPaymentArr = [
        ...(currentData.paymentArr || []),
        ...addPayData,
      ];

      await updateDoc(paymentDoc, {
        dynamicPay: dynamicPay,
        paymentArr: updatedPaymentArr,
        minMoney: minMoney,
      });

      Swal.fire({
        text: "ㅇㅋ 저장댐",
        icon: "success",
      }).then((result) => {
        if (closeModal) closeModal();
        window.location.reload();
      });
    } catch (e) {
      console.error(e);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <CalcForm onSubmit={CalcSubmit}>
        <InputBox>
          <label htmlFor="">남은금액</label>
          <input type="text" value={minMoney} disabled />
        </InputBox>
        <InputScroll>
          {inputBoxes.map((box) => (
            <InputBox key={box.id}>
              <label className="calcLabel">추가로 사용한 금액</label>
              <input
                type="text"
                name="addPayName"
                value={box.addPayName}
                onChange={(e) =>
                  handleInputChange(box.id, "addPayName", e.target.value)
                }
                placeholder="ex)14:00 칼국수"
              />
              <input
                type="text"
                name="addPay"
                value={box.addPay}
                onChange={(e) =>
                  handleInputChange(box.id, "addPay", e.target.value)
                }
                placeholder="46,000"
              />
              <RemoveBtn
                type="button"
                onClick={() => handleRemoveClick(box.id)}
              />
            </InputBox>
          ))}
        </InputScroll>
        <AddBtn type="button" onClick={handleAddClick}>
          추가
        </AddBtn>
        <EndBtn type="submit">적용</EndBtn>
      </CalcForm>
    </>
  );
};

export default PayCalc;
