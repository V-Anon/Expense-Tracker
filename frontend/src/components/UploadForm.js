import React, { useState } from "react";

function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return;
    await onUpload(file);
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} required />
      <button type="submit">Upload PDF</button>
    </form>
  );
}

export default UploadForm;
