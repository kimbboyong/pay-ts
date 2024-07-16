import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import { InputBox, RadioBox, Wrap } from "../../../../style/global";
import {
  Divide,
  FormInner,
  PayBtn,
  PayForm,
  PaySubmit,
  PreviewList,
} from "../PayCreate/style";

import useGetPayments, {
  PayDataType,
} from "../../../../hooks/services/queries/useGetPayments";

import { useEffect, useState } from "react";

import ColorCard from "../../../../components/ColorCard";
import { InputScroll } from "../PayCalc/style";

interface Param {
  id: string;
}

const PayRead = () => {
  const navigate = useNavigate();
  const params = useParams<Record<string, string | undefined>>();
  const param: Param = { id: params.id ?? "" };

  const [readData, setReadData] = useState<PayDataType | undefined>(undefined);

  const { data, error, isLoading } = useGetPayments();

  useEffect(() => {
    if (data && param.id) {
      const filterData = data.find((item) => item.id === param.id);
      setReadData(filterData);
    }
  }, [data]);

  console.log(readData);

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
                <RadioBox>
                  <input
                    type="radio"
                    id="complete"
                    name="radioState"
                    value="완료"
                    checked={readData?.radioState === "완료" ? true : false}
                    disabled
                  />
                  <label htmlFor="complete">완료</label>
                </RadioBox>
                <RadioBox>
                  <input
                    type="radio"
                    id="Incomplete"
                    name="radioState"
                    value="진행중"
                    checked={readData?.radioState === "진행중" ? true : false}
                    disabled
                  />
                  <label htmlFor="Incomplete">진행중</label>
                </RadioBox>
              </Divide>
            </InputBox>
            <InputScroll>
              {readData
                ? readData.paymentArr
                    .filter((pay) => pay.addPayName && pay.addPay) // 필터링 조건 추가
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
            <PaySubmit
              type="button"
              className="backBtn"
              onClick={() => navigate(-1)}
            >
              뒤로가기
            </PaySubmit>
          </PayBtn>
        </PayForm>
      </Wrap>
    </>
  );
};

export default PayRead;
