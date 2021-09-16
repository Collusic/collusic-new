import Files from "react-butterfiles";
import React from "react";
import { FileButton } from "./styled";

const fileupload = ({ files, errors, setFiles, setErrors, cancelFile }) => {
  return (
    <Files
      multiple={false}
      maxSize="10mb"
      multipleMaxSize="10mb"
      accept={["application/pdf", "image/jpg", "image/jpeg"]}
      onSuccess={(file) => setFiles(file)}
      onError={(error) => setErrors(error)}
    >
      {({ browseFiles, getDropZoneProps, getLabelProps }) => (
        <>
          <div
            {...getDropZoneProps({
              style: {
                width: "59%",
                marginTop: "20px",
                border: "2px solid #909090",
                padding: "0.5%",
                borderRadius: "20px",
              },
            })}
          >
            <ol>
              <>
                {Object.keys(files).length !== 0 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      key={files[0].name}
                    >
                      <FileButton name={files[0].id} onClick={cancelFile}>
                        x
                      </FileButton>
                      {files[0].name}
                    </div>
                  </>
                ) : (
                  <div>
                    <button
                      onClick={browseFiles}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "none",
                        backgroundColor: "inherit",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        color: "#909090",
                        fontFamily: "Noto Sans KR",
                      }}
                    >
                      <FileButton>+</FileButton>
                      Midi 파일을 드래그하여 업로드 해주세요.
                    </button>
                  </div>
                )}
              </>
            </ol>
          </div>
        </>
      )}
    </Files>
  );
};

export default fileupload;
