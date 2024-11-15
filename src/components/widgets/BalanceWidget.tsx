import React from 'react'

import { useBalance } from 'wagmi'
import { useWallets } from '@privy-io/react-auth';
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure} from '@nextui-org/react';
import { Link, LockIcon, MailIcon, PlusIcon, Wallet2Icon } from 'lucide-react';

import { NumberInput } from '../ui/number-input';

const BalanceWidget = () => {

    const {wallets} = useWallets();
    const balance =  useBalance({
        address: wallets[0]?.address as `0x${string}`,
        token: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
        chainId: 80002
        })
        const [count, setCount] = React.useState(0);  // Add this line


        const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <>

            <div className="flex  gap-0">
				<div className=" border-r-1 px-2 bg-background/50 rounded-l-full text-wrap align-middle text-center items-center pt-1 shadow border">
				$
					<span className="px-1 ">
                        {Number(balance?.data?.formatted).toFixed(2)}
                    </span>  
				</div>

               
                <Button size="sm" isIconOnly className="rounded-r-full" variant="shadow" onPress={onOpen}>
					<PlusIcon size={20} />
				</Button>

                <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Fund Your Account</ModalHeader>
                    <ModalBody>
                        <div className="space-y-6">
                            <NumberInput
                                value={count}
                                onChange={setCount}
                                min={0}
                                max={10000}
                                presetAmounts={[10, 25, 50, 100, 250, 500]}
                                className="w-full"
                            />

                            {/* Wallet Selection */}
                            <Select
                                isRequired
                                label="Select wallet"
                                placeholder={wallets[0].address}
                                defaultSelectedKeys={[wallets[0].address]}
                                className="max-w-full"
                                startContent={<Wallet2Icon size={20}/>}
                            >
                                {wallets.map((wallet) => (
                                    <SelectItem key={wallet.address} value={wallet.address}>
                                        {`${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button 
                            color="primary" 
                            onPress={() => {
                                wallets[0].fund()
                            }}
                            isDisabled={count <= 0}
                        >
                            Fund ${count}
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
      </Modal>
          
				
			</div>
    
    </>
  )
}

export default BalanceWidget