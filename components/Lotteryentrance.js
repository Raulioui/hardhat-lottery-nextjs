import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "@/constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import {ethers} from "ethers"
import Loader from "./Loader"
import { useNotification } from "@web3uikit/core"

export default async function LotteryEntrance(){
    const dispatch = useNotification()
    const [entranceFee, setEntranceFee] = useState("0")
    const [numOfPlayers, setNumOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = 
        chainId in contractAddresses ? contractAddresses[chainId][0]
            : null
        
    const {runContractFunction: enterRaffle} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee
    }) 

    const {runContractFunction: getEntranceFee} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const {runContractFunction: getNumOfPlayers} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumOfPlayers",
        params: {},
    })

    const {runContractFunction: getRecentWinner} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI(){
        const fee = (await getEntranceFee()).toString()
        setEntranceFee(fee)
        const players = (await getNumOfPlayers()).toString()
        setNumOfPlayers(players)
        const winner = await getRecentWinner()
        setRecentWinner(winner)
    }

    useEffect(() => {
        if(isWeb3Enabled){
            updateUI()
        }
    },[isWeb3Enabled])

    const handleSucces = async function(tx){
        await tx.wait(1)
        showNotification(tx)
        updateUI()
    }

    function showNotification(){
        dispatch({
            type: "succes",
            message: "Transaction Complete!",
            position: "topR",
            icon: "NaN"
        })
    }
    
    return(
        <div>
            {raffleAddress ? 
                <div>
                    <h2>Lotery entrance {ethers.utils.formatUnits(entranceFee, "ether")}</h2>
                    <button
                        className="bg-[white] text-[#0B72C8] font-bold px-[30px] py-[5px] rounded-xl"
                        onClick={async function(){
                            await enterRaffle({
                                onSuccess: handleSucces,
                            })
                        }}
                    >
                        Enter Raffle
                    </button>
                    <p>Number of players: {numOfPlayers}</p>
                    <p>Recent winner: {recentWinner}</p>
                </div>
                :

            <div>
                <Loader />   
            </div>}

            
            
        </div>        
    )
}