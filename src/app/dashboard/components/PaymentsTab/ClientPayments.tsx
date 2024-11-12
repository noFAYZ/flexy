import React from "react";
import { Card, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { DollarSign, Download, Filter } from "lucide-react";
import type { Transaction } from "../../types";

interface ClientPaymentsProps {
  transactions: Transaction[];
}

export const ClientPayments = ({ transactions }: ClientPaymentsProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Payments</h2>
          <p className="text-default-500">Manage your payments and transactions</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="flat" 
            startContent={<Filter className="w-4 h-4" />}
          >
            Filter
          </Button>
          <Button 
            variant="flat" 
            startContent={<Download className="w-4 h-4" />}
          >
            Export
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
        <Table aria-label="Transactions table">
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
                    {tx.type === "outgoing" ? "-" : "+"}${tx.amount}
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