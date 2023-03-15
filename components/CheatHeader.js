import { ConnectButton } from "@web3uikit/web3";

export default function CheaterHeader(){
    return(
        <div className="flex items-center justify-between">
            <div>   
            <img 
                    src="https://images-platform.99static.com//1bUDu69Zkuf7c-reBkn45sKTQjA=/389x2973:1245x3829/fit-in/500x500/99designs-contests-attachments/132/132756/attachment_132756738"
                    className="w-[150px] "/>               
            </div>

            <div>
                <ConnectButton moralisAuth={false}/>
            </div>
        </div>
    )
}

