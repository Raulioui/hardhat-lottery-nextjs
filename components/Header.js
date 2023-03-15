import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function Header(){
    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis()

    useEffect(() => {
        if(isWeb3Enabled) return
        if(typeof window !== "undefined"){
            if(window.localStorage.getItem("connected")){
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if(account == null){
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    return(
        <header className="px-16 py-8 flex items-center justify-between">
            <div>
                <img 
                    src="https://images-platform.99static.com//1bUDu69Zkuf7c-reBkn45sKTQjA=/389x2973:1245x3829/fit-in/500x500/99designs-contests-attachments/132/132756/attachment_132756738"
                    className="w-[150px] "
                />
            </div>
            <div>
                {account ? 
                    (<p className="text-sm text-white  absolute top-0 right-0 px-16 py-32">Conected to {account.slice(0, 6)}...
                    {account.slice(account.length - 4)}</p>) : 
                    (<p></p>)
                }
            </div>
            <div>
                <button 
                    onClick={async () => {
                        await enableWeb3()
                        if(typeof window !== "undefined"){
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                    className="text-[#07173A] 
                    font-bold bg-[#1EEEB2] px-[30px] py-[6px]">
                        {account ? "Connected" : "Connect Wallet"}
                </button>
            </div>
        </header>
    )
}