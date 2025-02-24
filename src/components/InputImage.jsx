import React, { useState } from "react";

function InputImage({formData,setFormData}) {
    const [file, setFile] = useState();

    function handleChange(e) {
        
        setFile(URL.createObjectURL(e.target.files[0]));
        
        setFormData({...formData, certified: URL.createObjectURL(e.target.files[0])})
    }
    
  return (
    <>
    <input 
        type="file"
        onChange={handleChange} 
        className=" border-gray-300 rounded"
    />
    {file && <img src={file} alt="Uploaded" className="ml-10 w-40 h-16 rounded" />}
    </>
  )
}

export default InputImage