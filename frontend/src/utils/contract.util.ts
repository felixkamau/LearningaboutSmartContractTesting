import { ethers } from "ethers";
import { ContractAbi, ContractAddr } from "@/constants";

// Get the  Ethereum Provider from web
const getProvider = (): ethers.providers.Web3Provider => {
    if(typeof window !== 'undefined' && window.ethereum){
        console.log("Ethereum Provider detected");
        return new ethers.providers.Web3Provider(window.ethereum)
    }else{
        console.error("No Ethereum Provider Found");
        alert('No Ethereum Provider Found. Please install Metamask');
        throw new Error('No Ethereum Provider Found. Please install Metamask')
    }
}


// const getProvider = () => 
//     (typeof window !== 'undefined' && window.ethereum) 
//         ? new ethers.providers.Web3Provider(window.ethereum) 
//         : (() => { 
//             alert('No Ethereum Provider Found. Please install Metamask');
//             console.error("No Ethereum Provider Found");
//             throw new Error('No Ethereum Provider Found. Please install Metamask');
//           })();

// Get signer
const getSigner = async (): Promise<ethers.providers.JsonRpcSigner> => {
    const provider = getProvider();
    // await provider.send('eth-requestAccounts',[]);
    await provider.send('eth_requestAccounts',[]);

    return provider.getSigner();
}


const getContract = async (): Promise<ethers.Contract> => {
    const signer = await getSigner();
    return new ethers.Contract(ContractAddr, ContractAbi, signer);
}

export {getProvider, getSigner, getContract}  // export the functions