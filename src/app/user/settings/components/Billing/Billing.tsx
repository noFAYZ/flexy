"use client";
import React from 'react';
import { Card, CardBody, Chip, Button} from "@nextui-org/react";
import {

  CreditCard,

  Download,
  Trash2,
  Plus,

} from "lucide-react";



export const BillingSettings = () => (
    <Card className="bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
      <CardBody className="p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Billing & Payments
          </h2>
          <p className="text-foreground/60">
            Manage your billing information and view payment history
          </p>
        </div>
  
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="p-4 bg-content2 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Current Plan</h3>
                <p className="text-sm text-foreground/60">Professional Plan</p>
              </div>
              <Chip
                className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
              >
                Active
              </Chip>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold">$29</span>
              <span className="text-foreground/60">/month</span>
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
            >
              Upgrade Plan
            </Button>
          </div>
  
          {/* Payment Methods */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Payment Methods</h3>
              <Button
                size="sm"
                variant="flat"
                startContent={<Plus size={16} />}
              >
                Add New
              </Button>
            </div>
            
            <div className="space-y-3">
              <PaymentMethodCard
                type="visa"
                last4="4242"
                expiry="12/24"
                isDefault
              />
              <PaymentMethodCard
                type="mastercard"
                last4="8888"
                expiry="09/25" isDefault={undefined}            />
            </div>
          </div>
  
          {/* Billing History */}
          <div className="space-y-4">
            <h3 className="font-medium">Billing History</h3>
            <div className="space-y-3">
              <BillingHistoryItem
                date="Oct 1, 2023"
                amount="$29.00"
                status="Paid"
                invoice="#INV-2023-010"
              />
              <BillingHistoryItem
                date="Sep 1, 2023"
                amount="$29.00"
                status="Paid"
                invoice="#INV-2023-009"
              />
              <BillingHistoryItem
                date="Aug 1, 2023"
                amount="$29.00"
                status="Paid"
                invoice="#INV-2023-008"
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
  
  const PaymentMethodCard = ({ type, last4, expiry, isDefault }) => (
    <div className="flex items-center justify-between p-4 bg-content3 rounded-xl">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${type === 'visa' ? 'bg-blue-100' : 'bg-red-100'}`}>
          {type === 'visa' ? (
            <CreditCard size={24} className="text-blue-500" />
          ) : (
            <CreditCard size={24} className="text-red-500" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium capitalize">{type}</span>
            <span className="text-sm text-foreground/60">•••• {last4}</span>
          </div>
          <p className="text-sm text-foreground/60">Expires {expiry}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isDefault && (
          <Chip size="sm" variant="flat" color="primary">
            Default
          </Chip>
        )}
        <Button
          isIconOnly
          size="sm"
          variant="light"
          className="text-danger"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
  
  const BillingHistoryItem = ({ date, amount, status, invoice }) => (
    <div className="flex items-center justify-between p-4 bg-content3 rounded-xl">
      <div>
        <p className="font-medium">{date}</p>
        <p className="text-sm text-foreground/60">{invoice}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium">{amount}</span>
        <Chip
          size="sm"
          variant="flat"
          color="success"
          className="min-w-[80px] justify-center"
        >
          {status}
        </Chip>
        <Button
          isIconOnly
          size="sm"
          variant="light"
        >
          <Download size={16} />
        </Button>
      </div>
    </div>
  );
  