import { Input } from '@nextui-org/react'
import { Search } from 'lucide-react'
import React from 'react'
import { IconParkTwotoneSearch, LetsIconsSearchDuotone, MingcuteSearch3Fill } from '../icons/icons'

const SearchWidget = () => {
  return (
    <>
        <div className="relative group">
								<Input
								classNames={{
									base: "w-14 h-14 group-hover:w-[12rem] transition-all duration-300",
									mainWrapper: "h-full",
									input: "text-lg opacity-0 group-hover:opacity-100 transition-opacity",
									inputWrapper: "h-full font-normal text-default-500 bg-white/10 dark:bg-gray-800/30 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-colors rounded-full",
								}}
							
								size="sm"
								type="search"
								/>
								<IconParkTwotoneSearch className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 group-hover:left-3 transition-all duration-300" />
							</div>
    </>
  )
}

export default SearchWidget