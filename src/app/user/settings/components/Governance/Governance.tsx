"use client";
import React  from 'react';
import { Button, Card, CardBody,  Chip,  Progress } from "@nextui-org/react";





export const TokenGovernanceSettings = () => (
    <Card className="bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
      <CardBody className="p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Token Governance
          </h2>
          <p className="text-foreground/60">
            Manage your platform tokens and governance participation
          </p>
        </div>
  
        <div className="space-y-6">
          {/* Token Balance */}
          <div className="bg-content2 rounded-xl p-4">
            <h3 className="font-medium mb-4">Your Tokens</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TokenCard
                type="Platform Tokens"
                amount="1,500 FLX"
                value="$3,000 USD"
              />
              <TokenCard
                type="Voting Power"
                amount="1,200 vFLX"
                value="80% locked"
              />
              <TokenCard
                type="Rewards Pending"
                amount="50 FLX"
                value="$100 USD"
              />
            </div>
          </div>
  
          {/* Active Proposals */}
          <div className="bg-content2 rounded-xl p-4">
            <h3 className="font-medium mb-4">Active Proposals</h3>
            <div className="space-y-4">
              <ProposalCard
                title="Fee Structure Update"
                description="Proposal to adjust platform fees"
                votingEnds="2d 5h"
                participation="65%"
              />
              <ProposalCard
                title="New Feature Implementation"
                description="Add cross-chain support"
                votingEnds="5d 12h"
                participation="45%"
              />
            </div>
          </div>
  
          {/* Staking */}
          <div className="bg-content2 rounded-xl p-4">
            <h3 className="font-medium mb-4">Staking</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StakingPool
                name="Freelancer Pool"
                apr="12%"
                locked="500 FLX"
                duration="3 months"
              />
              <StakingPool
                name="Client Pool"
                apr="8%"
                locked="300 FLX"
                duration="1 month"
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );

   const TokenCard = ({ type, amount, value }) => (
    <Card className="bg-default-50">
      <CardBody className="p-4">
        <div className="space-y-2">
          <span className="text-sm text-default-500">{type}</span>
          <div className="flex items-end gap-2">
            <span className="text-xl font-bold">{amount}</span>
            <span className="text-sm text-default-500">{value}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
  
   const ProposalCard = ({ title, description, votingEnds, participation }) => (
    <Card className="bg-default-50">
      <CardBody className="p-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-default-500">{description}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-xs text-default-500">Voting Ends</span>
              <div className="font-medium">{votingEnds}</div>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-xs text-default-500">Participation</span>
              <div className="font-medium">{participation}</div>
            </div>
          </div>
          <Progress 
            value={parseInt(participation)} 
            className="h-2"
            classNames={{
              indicator: "bg-gradient-to-r from-pink-500 to-orange-500"
            }}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-success/10 text-success"
            >
              Vote For
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-danger/10 text-danger"
            >
              Vote Against
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
  
   const StakingPool = ({ name, apr, locked, duration }) => (
    <Card className="bg-default-50">
      <CardBody className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{name}</h4>
            <Chip 
              size="sm" 
              className="bg-success/10 text-success"
            >
              {apr} APR
            </Chip>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-default-500">Locked</span>
              <div className="font-medium">{locked}</div>
            </div>
            <div>
              <span className="text-sm text-default-500">Duration</span>
              <div className="font-medium">{duration}</div>
            </div>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white"
            size="sm"
          >
            Stake Tokens
          </Button>
        </div>
      </CardBody>
    </Card>
  );