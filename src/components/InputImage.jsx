import React, { useState } from "react";

function InputImage() {
    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    
  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
    <h2 className="text-lg font-semibold mb-2">Add Image:</h2>
    <input 
        type="file" 
        onChange={handleChange} 
        className="mb-4 p-2 border border-gray-300 rounded"
    />
    {file && <img src={file} alt="Uploaded" className="max-w-full h-auto rounded" />}
</div>
  )
}

export default InputImage