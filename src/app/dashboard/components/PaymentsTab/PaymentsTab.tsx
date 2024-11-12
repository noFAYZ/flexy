import React from "react";
import { ClientPayments } from "./ClientPayments";

import type { Transaction } from "../../types";
import { FreelancerPayments } from "./FreelancerPayments";

interface PaymentsTabProps {
  userType: string;
  transactions: Transaction[];
}

export const PaymentsTab = ({ userType, transactions }: PaymentsTabProps) => {
  return userType === "client" ? (
    <ClientPayments transactions={transactions} />
  ) : (
    <FreelancerPayments transactions={transactions} />
  );
}; 