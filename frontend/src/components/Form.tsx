import { useState } from "react";

interface FormProps {
    onSubmit: (input: string) => Promise<void>;
    placeholder?: string;
    buttonText?: string;
}


const Form: React.FC<FormProps> = ({ onSubmit, placeholder = " Enter a value", buttonText = "Submit" }) => {
    const [input, setInput] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!input.trim()) {
            alert("Input required")
            return
        }

        await onSubmit(input);
        setInput(""); // clear input after sub
    }



    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg shadow-md">
                <input
                    type="text"
                    value={input}
                    placeholder={placeholder}
                    onChange={(e) => setInput(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="
                    bg-blue-500 
                    text-white
                    p-2
                    rounded
                    hover:bg-blue-600
                ">
                    {buttonText}
                </button>
            </form>
        </div>
    )
}


export default Form;