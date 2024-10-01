import React, { useState } from "react";
import axios from "axios";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [ordrDownloadLinks, setOrdrDownloadLinks] = useState<{
    xlsx: string | null;
    txt: string | null;
  }>({ xlsx: null, txt: null });
  const [rdr1DownloadLinks, setRdr1DownloadLinks] = useState<{
    xlsx: string | null;
    txt: string | null;
  }>({ xlsx: null, txt: null });

  // Inline styles
  const containerStyle = {
    textAlign: "center" as const,
    marginTop: "50px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    maxWidth: "500px",
    margin: "50px auto",
    backgroundColor: "#f9f9f9",
  };

  const inputStyle = {
    display: "block",
    margin: "20px auto",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    maxWidth: "80%",
    cursor: "pointer",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
  };

  const downloadButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
    display: "block",
    textDecoration: "none",
  };

  const messageStyle = {
    color: "#333",
    marginTop: "20px",
  };

  const sectionStyle = {
    marginTop: "20px",
    borderTop: "1px solid #ddd",
    paddingTop: "20px",
  };

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Handle form submission to upload the file and generate both sheets
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Generate ORDR sheet
      const ordrResponse = await axios.post(
        "http://127.0.0.1:8000/api/generate-ordr/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Generate RDR1 sheet
      const rdr1Response = await axios.post(
        "http://127.0.0.1:8000/api/generate-rdr1/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Set download links for both ORDR .xlsx and .txt
      setOrdrDownloadLinks({
        xlsx: `http://127.0.0.1:8000${ordrResponse.data.file_path_xlsx}`,
        txt: `http://127.0.0.1:8000${ordrResponse.data.file_path_txt}`,
      });

      // Set download links for both RDR1 .xlsx and .txt
      setRdr1DownloadLinks({
        xlsx: `http://127.0.0.1:8000${rdr1Response.data.file_path_xlsx}`,
        txt: `http://127.0.0.1:8000${rdr1Response.data.file_path_txt}`,
      });

      setMessage("Both ORDR and RDR1 sheets generated successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error generating sheets. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Upload Excel File</h2>

      <input type="file" onChange={handleFileChange} style={inputStyle} />

      <button
        onClick={handleUpload}
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
      >
        Upload and Generate ORDR and RDR1
      </button>

      {message && <p style={messageStyle}>{message}</p>}

      {/* ORDR Sheet Section */}
      {ordrDownloadLinks.xlsx && (
        <div style={sectionStyle}>
          <h3>ORDR Sheet</h3>
          <a
            href={ordrDownloadLinks.xlsx}
            download
            style={downloadButtonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Download ORDR Excel (.xlsx)
          </a>
          <a
            href={ordrDownloadLinks.txt}
            download
            style={downloadButtonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Download ORDR Text (.txt)
          </a>
        </div>
      )}

      {/* RDR1 Sheet Section */}
      {rdr1DownloadLinks.xlsx && (
        <div style={sectionStyle}>
          <h3>RDR1 Sheet</h3>
          <a
            href={rdr1DownloadLinks.xlsx}
            download
            style={downloadButtonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Download RDR1 Excel (.xlsx)
          </a>
          <a
            href={rdr1DownloadLinks.txt}
            download
            style={downloadButtonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Download RDR1 Text (.txt)
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
