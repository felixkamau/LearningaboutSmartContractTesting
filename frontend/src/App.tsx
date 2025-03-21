import { getContract } from "@/utils"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import Form from "./components/Form";



function App() {

  const [contract, setContract] = useState<ethers.Contract | null>(null);
  // The above state will store contract instance

  const fetchContract = async () => {
    try {
      const contractInstance = await getContract();
      setContract(contractInstance);
      console.log("Contract Loaded", contractInstance);
    } catch (error) {
      console.error("Error loading contract", error);
    }
  };



  const addCandidate = async (name: string) => {
    if (!contract) {
      console.log("Contract not loaded");
      return;
    }
    try {
      const tx = await contract.addCandidate(name);
      await tx.wait();
      alert("Candidate Added");
    } catch (error) {
      console.error("Error adding candidate", error)
    }
  }

  useEffect(() => {
    // This useEffect ensure that the getContract() is called once when the component mounts
    fetchContract();
  }, [])


  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-4">SACCO Voting System</h1>
      {contract ? (
        <Form onSubmit={addCandidate} placeholder="Candidate Name" buttonText="Add Candidate" />
      ) : (
        <p className="text-center">Loading contract...</p>
      )}
    </div>
  )
}

export default App
