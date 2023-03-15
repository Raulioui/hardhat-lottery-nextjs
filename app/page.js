"use client"
import { MoralisProvider } from "react-moralis"
import CheaterHeader from "@/components/CheatHeader"
import LotteryEntrance from "@/components/Lotteryentrance"
import { NotificationProvider } from "@web3uikit/core"

export default function Home() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <div className="bg-[#07173A] h-screen font-mono">
          <div className="w-[50%] mx-auto">
            <CheaterHeader />
            <LotteryEntrance />
          </div>
        </div>
      </NotificationProvider>
    </MoralisProvider>
  )
}
