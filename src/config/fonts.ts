import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google"
import localFont from 'next/font/local'


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontLufga = localFont({
  src: [
      {
        path: '../../public/fonts/lufga/LufgaRegular.woff',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../../public/fonts/lufga/LufgaMediumItalic.woff',
        weight: '400',
        style: 'italic',
      },
      {
        path: '../../public/fonts/lufga/LufgaSemiBold.woff',
        weight: '500',
        style: 'normal',
      },
      {
        path: '../../public/fonts/lufga/LufgaSemiBoldItalic.woff',
        weight: '500',
        style: 'italic',
      },
      {
        path: '../../public/fonts/lufga/LufgaBold.woff',
        weight: '700',
        style: 'normal',
      },
      {
        path: '../../public/fonts/lufga/LufgaBoldItalic.woff',
        weight: '700',
        style: 'italic',
      },

  ],
  variable: '--font-lufga',
})