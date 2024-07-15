import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/fbInstance";

export interface PayDataType {
  id: string;
  host: string;
  maxMoney: string;
  minMoney: string;
  member: Array<{ value: string; color: string }>;
  radioState: string;
  userUid: string;
  date: string;
}

const fetchPayments = async (): Promise<PayDataType[]> => {
  const querySnapshot = await getDocs(collection(db, "payments"));
  const paymentsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as PayDataType[];
  return paymentsData;
};

const useGetPayments = (): UseQueryResult<PayDataType[], Error> => {
  return useQuery<PayDataType[], Error>({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });
};

export default useGetPayments;
