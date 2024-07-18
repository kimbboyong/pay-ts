import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import { InputBox, RadioBox, Wrap } from "../../../../style/global";
import {
  Divide,
  FormInner,
  PayBtn,
  PayForm,
  PreviewList,
} from "../PayCreate/style";

import useGetPayments, {
  PayDataType,
} from "../../../../hooks/services/queries/useGetPayments";

import { useEffect, useState } from "react";

import ColorCard from "../../../../components/ColorCard";
import { InputScroll } from "../PayCalc/style";
import { Button } from "@mui/material";
import useUserInfo from "../../../../hooks/useUserInfo";
import { StateBox } from "./stlye";

interface Param {
  id: string;
}
const PayRead = () => {
  const navigate = useNavigate();
  const params = useParams<Record<string, string | undefined>>();
  const param: Param = { id: params.id ?? "" };

  const { data, error, isLoading } = useGetPayments();
  const userData = useUserInfo();
  const [readData, setReadData] = useState<PayDataType | undefined>(undefined);

  useEffect(() => {
    if (data && param.id) {
      const filterData = data.find((item) => item.id === param.id);
      setReadData(filterData);
    }
  }, [data]);

  return (
    <>
      <Header title="엔빵리스트 수정" />
      <Wrap>
        <PayForm>
          <FormInner>
            <InputBox>
              <label>총무</label>
              <input
                type="text"
                name="host"
                value={readData?.host || ""}
                disabled
              />
            </InputBox>
            <InputBox>
              <label>총금액</label>
              <input
                type="text"
                name="maxMoney"
                value={readData?.maxMoney || ""}
                disabled
              />
            </InputBox>
            <InputBox>
              <label>남은금액</label>
              <input
                type="text"
                name="minMoney"
                value={readData?.minMoney || ""}
                disabled
              />
            </InputBox>

            <InputBox>
              <label>멤버</label>
              <PreviewList>
                {readData?.member.map((member, idx) => (
                  <div key={idx}>
                    <ColorCard CardValue={member.value} color={member.color} />
                  </div>
                ))}
              </PreviewList>
            </InputBox>
            <InputBox>
              <label>상태</label>
              <Divide>
                {readData?.radioState === "완료" ? (
                  <ColorCard CardValue="완료" color="blue" />
                ) : (
                  <ColorCard CardValue="진행중" color="red" />
                )}
              </Divide>
            </InputBox>
            <InputScroll>
              {readData
                ? readData.paymentArr
                    .filter((pay) => pay.addPayName && pay.addPay)
                    .map((pay) => (
                      <InputBox key={pay.addPayName}>
                        <label className="calcLabel">추가로 사용한 금액</label>
                        <input
                          type="text"
                          name="addPayName"
                          value={pay.addPayName}
                          disabled
                        />
                        <input
                          type="text"
                          name="addPay"
                          value={pay.addPay}
                          disabled
                        />
                      </InputBox>
                    ))
                : ""}
            </InputScroll>
          </FormInner>
          <PayBtn>
            {readData?.userUid === userData?.uid ? (
              <>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{ bgcolor: "primary.main" }}
                  onClick={() => navigate(`/pay/${readData?.id}`)}
                >
                  수정
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{ bgcolor: "error.main" }}
                >
                  삭제
                </Button>
              </>
            ) : null}
            <Button
              variant="contained"
              disableElevation
              sx={{ bgcolor: "text.secondary" }}
              onClick={() => navigate(-1)}
            >
              뒤로가기
            </Button>
          </PayBtn>
        </PayForm>
      </Wrap>
    </>
  );
};

export default PayRead;
