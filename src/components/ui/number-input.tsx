import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from '@nextui-org/react';
import { DollarSign, ChevronDown } from 'lucide-react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  presetAmounts?: number[];
  className?: string;
}

const currencies = [
  { key: 'USD', symbol: '$', name: 'US Dollar' },
  { key: 'EUR', symbol: '€', name: 'Euro' },
  { key: 'GBP', symbol: '£', name: 'British Pound' },
];

export const NumberInput = ({
  value,
  onChange,
  min = 0,
  max = 10000,
  presetAmounts = [10, 25, 50, 100, 250, 500],
  className = ''
}: NumberInputProps) => {
  const [displayValue, setDisplayValue] = useState<string>(value.toString());
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  useEffect(() => {
    setDisplayValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);
    const parsedValue = parseFloat(newValue);
    if (!isNaN(parsedValue) && parsedValue >= min && parsedValue <= max) {
      onChange(parsedValue);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <motion.div
          className={`flex rounded-2xl bg-gradient-to-r from-background/80 to-background border-1 overflow-hidden
            ${isFocused ? 'ring-2 ring-primary shadow-lg' : 'shadow-sm'}`}
        >
          {/* Currency Selector */}
          <Dropdown>
            <DropdownTrigger>
              <Button 
                className="h-14 min-w-[4rem] rounded-r-none border-r-1"
                variant="light"
              >
                <span className="text-xl font-semibold">{selectedCurrency.symbol}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Currency Selection"
              onAction={(key) => setSelectedCurrency(currencies.find(c => c.key === key) || currencies[0])}
            >
              {currencies.map((currency) => (
                <DropdownItem key={currency.key}>
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{currency.symbol}</span>
                    <span>{currency.name}</span>
                  </span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Number Input */}
          <input
            type="number"
            value={displayValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            min={min}
            max={max}
            className="w-full bg-transparent px-4 text-2xl font-medium focus:outline-none"
            placeholder="0.00"
          />
        </motion.div>

        {/* Floating Label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-6 left-2 text-sm text-default-500"
        >
          Amount
        </motion.span>
      </div>

      {/* Preset Amounts */}
      <div className="flex flex-wrap gap-6">
        {presetAmounts.map((amount) => (


          <Chip
            key={amount}
            size="md"
            variant={value === amount ? "solid" : "flat"}
            className={`
              ${value === amount ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg scale-105 cursor-pointer ' : 'bg-default-200'}
              transition-all duration-200 hover:scale-105 cursor-pointer 
            `}
            onClick={() => onChange(amount)}
          >
            {selectedCurrency.symbol}{amount}
          </Chip>
        ))}
      </div>

      {/* Min/Max Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        className="flex justify-between text-xs text-default-400"
      >
        <span>Min: {selectedCurrency.symbol}{min}</span>
        <span>Max: {selectedCurrency.symbol}{max}</span>
      </motion.div>
    </div>
  );
};

// Usage example:
{/* 
<NumberInput
  value={count}
  onChange={setCount}
  min={0}
  max={100}
  step={1}
  label="Quantity"
  className="w-48"
/> 
*/} 