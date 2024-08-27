import React from 'react'

import { useBalance } from 'wagmi'
import { useWallets } from '@privy-io/react-auth';
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure} from '@nextui-org/react';
import { Link, LockIcon, MailIcon, PlusIcon, Wallet2Icon } from 'lucide-react';
import Transak from './TransakWidget';

const BalanceWidget = () => {

    const {wallets} = useWallets();
    const balance =  useBalance({
        address: wallets[0]?.address as `0x${string}`,
        token: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
        chainId: 80002
        })

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

                    <Input
                        label="Price"
                        placeholder="0.00"
                        labelPlacement="outside"
                        startContent={
                            <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">$</span>
                            </div>
                        }
                        endContent={
                            <div className="flex items-center">
                            <label className="sr-only" htmlFor="currency">
                                Currency
                            </label>
                            <select
                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                id="currency"
                                name="currency"
                            >
                                <option>USD</option>
                                <option>ARS</option>
                                <option>EUR</option>
                            </select>
                            </div>
                        }
                        type="number"
                        />


                    <Select
                        isRequired
                        label="Select an wallet"
                        placeholder={wallets[0].address}
                        defaultSelectedKeys={[wallets[0].address]}
                        className="max-w-full"
                        startContent={<Wallet2Icon size={20}/>}
                        >
                        {wallets.map((wallet) => (
                            <SelectItem key={wallet.address}>
                            {wallet.address}
                            </SelectItem>
                        ))}
                        </Select>

                       {/*  <Transak/> */}


                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={()=>
                        {
                             wallets[0].fund()
                            }
                            }>
                        Top Up
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