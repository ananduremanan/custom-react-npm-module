import React, { useState } from "react";
import {
  RemovingEventArgs,
  UploaderComponent,
} from "@syncfusion/ej2-react-inputs";

interface FileSelectEventArgs {
  filesData: any[];
}

interface UploaderProps {
  fileTypes?: any[];
  fileCount?: number;
  onFilesChange?: (files: any[]) => void;
}

export const Uploader: React.FC<UploaderProps> = ({
  fileTypes,
  fileCount,
  onFilesChange,
}) => {
  const typ = fileTypes?.map((ty: any) => ty).join(", ");
  const dropContainerRef = React.useRef<HTMLDivElement>(null);
  const uploadObjRef = React.useRef<UploaderComponent>(null);
  const count = fileCount;

  // testing code starts
  const onFileRemove = (args: RemovingEventArgs) => {
    setFiles((prevState) => {
      const newFiles = prevState.filter(
        (file) =>
          !args.filesData.some(
            (removedFile: any) =>
              removedFile.name === file.name && removedFile.size === file.size
          )
      );
      onFilesChange?.(newFiles);
      return newFiles;
    });

    const err_element = document.getElementsByClassName("e-error")[0];
    err_element.innerHTML = "";
  };
  // testing code end

  React.useEffect(() => {
    if (uploadObjRef.current && dropContainerRef.current) {
      const uploadObj = uploadObjRef.current;
      uploadObj.dropArea = dropContainerRef.current;
      uploadObj.element.setAttribute("name", "UploadFiles");
      uploadObj.dataBind();
      uploadObj.addEventListener("removing", onFileRemove);
    }
    return () => {
      if (uploadObjRef.current) {
        uploadObjRef.current.removeEventListener("removing", onFileRemove);
      }
    };
  }, []);

  const [files, setFiles] = useState<any[]>([]);

  const onFileSelect = (args: FileSelectEventArgs) => {
    if (uploadObjRef.current && count) {
      const fileLength =
        args.filesData.length + uploadObjRef.current.getFilesData().length;
      const err_element = document.getElementsByClassName("e-error")[0];

      if (fileLength > count) {
        args.filesData.splice(count, args.filesData.length);
        err_element.innerHTML = "maximum of " + count + " files to upload";
      } else if (fileLength < count) {
        args.filesData.splice(count, args.filesData.length);
        err_element.innerHTML = "You should upload " + count + " files";
      } else {
        err_element.innerHTML = "";
      }
    }

    let fileData = args.filesData;

    if (args.filesData) {
      // Check for duplicate files
      const duplicateFiles = fileData.filter((newFile) =>
        files.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size
        )
      );

      // Remove duplicate files from fileData
      fileData = fileData.filter(
        (newFile) =>
          !duplicateFiles.some(
            (duplicateFile) =>
              duplicateFile.name === newFile.name &&
              duplicateFile.size === newFile.size
          )
      );

      // Displaying the duplicate file error
      if (duplicateFiles.length > 0) {
        const errorElement = document.getElementsByClassName("e-error")[0];
        errorElement.innerHTML = "Can't upload duplicate files!";

        setTimeout(() => {
          errorElement.innerHTML = "";
        }, 4000);
      }

      if (uploadObjRef.current && count) {
        var fileLength =
          args.filesData.length + uploadObjRef.current.getFilesData().length;
        if (
          fileLength <= count &&
          fileData.every((obj) => obj.statusCode === "1")
        ) {
          setFiles((prevState: any[]) => {
            const newFiles = [...prevState, ...fileData];
            onFilesChange?.(newFiles);
            return newFiles;
          });
        }
      }
    }
  };

  return (
    <div className="control-pane" ref={dropContainerRef}>
      <div className="control-section row uploadpreview">
        <div className="col-lg-9">
          <div className="upload_wrapper">
            <UploaderComponent
              id="fileUpload"
              type="file"
              ref={uploadObjRef}
              allowedExtensions={typ ? `${typ}` : undefined}
              selected={onFileSelect}
            />
            <div className="e-error"></div>
          </div>
        </div>
      </div>
    </div>
  );
};