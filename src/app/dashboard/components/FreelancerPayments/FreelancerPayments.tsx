import React from "react";
import { Card, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { DollarSign, Download, Filter,  CreditCard, PiggyBankIcon } from "lucide-react";

export const FreelancerPayments = () => {
  const earnings = [
    {
      id: 1,
      date: "2024-02-15",
      project: "NFT Marketplace Development",
      amount: 3500,
      status: "released",
    },
    // Add more earnings...
  ];

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
            startContent={<CreditCard className="w-4 h-4" />}
          >
            Request Payment
          </Button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-default-500">Total Balance</p>
          <h3 className="text-2xl font-semibold">$45,280</h3>
          <Button size="sm" className="mt-2">Top Up</Button>
        </Card>
        <Card className="p-4">
          <p className="text-default-500">In Escrow</p>
          <h3 className="text-2xl font-semibold">$12,500</h3>
          <Button size="sm" variant="flat" className="mt-2">View Details</Button>
        </Card>
        <Card className="p-4">
          <p className="text-default-500">Monthly Spend</p>
          <h3 className="text-2xl font-semibold">$28,350</h3>
          <Button size="sm" variant="flat" className="mt-2">View Report</Button>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <Table>
          <TableHeader>
            <TableColumn>DATE</TableColumn>
            <TableColumn>PROJECT</TableColumn>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {earnings.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell>{tx.project}</TableCell>
                <TableCell>
                  <span className={tx.status === "released" ? "text-success" : "text-default-400"}>
                    {tx.status === "released" ? "+" : "-"}${tx.amount}
                  </span>
                </TableCell>
                <TableCell>
                  <Chip 
                    size="sm" 
                    color={tx.status === "released" ? "success" : "warning"}
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