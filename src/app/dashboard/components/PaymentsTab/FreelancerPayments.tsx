import React from "react";
import { Card, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { DollarSign, Download, Filter, CreditCard, PiggyBankIcon } from "lucide-react";
import type { Transaction } from "../../types";

interface FreelancerPaymentsProps {
  transactions: Transaction[];
}

export const FreelancerPayments = ({ transactions }: FreelancerPaymentsProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Earnings</h2>
          <p className="text-default-500">Track your earnings and withdrawals</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="flat" 
            startContent={<PiggyBankIcon className="w-4 h-4" />}
          >
            Withdraw
          </Button>
          <Button 
            variant="flat" 
            startContent={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-default-500">Available Balance</p>
          <h3 className="text-2xl font-semibold">$12,580</h3>
          <Button size="sm" className="mt-2">Withdraw</Button>
        </Card>
        <Card className="p-4">
          <p className="text-default-500">Pending Earnings</p>
          <h3 className="text-2xl font-semibold">$5,200</h3>
          <Button size="sm" variant="flat" className="mt-2">View Details</Button>
        </Card>
        <Card className="p-4">
          <p className="text-default-500">Total Earned</p>
          <h3 className="text-2xl font-semibold">$85,350</h3>
          <Button size="sm" variant="flat" className="mt-2">View Report</Button>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <Button size="sm" startContent={<CreditCard className="w-4 h-4" />}>
            Add New
          </Button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 rounded-lg border border-default-200">
            <div className="flex items-center gap-3">
              <PiggyBankIcon className="w-5 h-5" />
              <div>
                <p className="font-medium">Bank Account</p>
                <p className="text-sm text-default-500">****1234</p>
              </div>
            </div>
            <Chip color="success" size="sm">Default</Chip>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg border border-default-200">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              <div>
                <p className="font-medium">Crypto Wallet</p>
                <p className="text-sm text-default-500">0x1234...5678</p>
              </div>
            </div>
            <Button size="sm" variant="flat">Set Default</Button>
          </div>
        </div>
      </Card>

      {/* Earnings History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Earnings History</h3>
        <Table aria-label="Earnings history table">
          <TableHeader>
            <TableColumn>DATE</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>
                  <span className={tx.type === "outgoing" ? "text-danger" : "text-success"}>
                    ${tx.amount}
                  </span>
                </TableCell>
                <TableCell>
                  <Chip 
                    size="sm" 
                    color={tx.status === "completed" ? "success" : "warning"}
                  >
                    {tx.status}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}; 