import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FileCard } from 'src/components/Cards';
import { Link } from 'src/components/Icons';
import { IconButton } from 'src/components/Buttons';

/**
 * FileInput Component
 * 
 * @param {Object} props
 * @param {string} props.title - Title for the file upload section. Default is "File Upload (Beta)".
 * @param {File} props.initialFile - The initial file to be displayed. Default is undefined.
 * @param {function} props.onFileChange - Callback function when the file is changed. Default is an empty function.
 */

const FileInput = React.forwardRef(({ register = () => { }, name, validationSchema, title = "File Upload (Beta)", initialFile, onFileChange = () => { } }, ref) => {
    const [file, setFile] = useState(initialFile);
    const fileUploadRef = useRef(null);

    useImperativeHandle(ref, () => ({
        get current() {
            return fileUploadRef.current;
        },
        click: () => {
            fileUploadRef.current.click();
        }
    }));

    useEffect(() => {
        // Update the file state when the initialFile prop changes
        setFile(initialFile);
    }, [initialFile]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            onFileChange(selectedFile); // Callback for parent component
        }
    };

    const handleFileUploadClick = () => {
        fileUploadRef.current.click();
    };

    return (
        <div className="flex-col justify-start items-start self-stretch">
            <input
                {...register(name, validationSchema)}
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.txt"
                ref={fileUploadRef}
                onChange={handleFileChange}
            />
            <div className="flex-col justify-start items-start self-stretch gap-xxs">
                {title && <div className="text-sm-md text-gray-4">
                    {title}
                </div>}
                {file ?
                    <FileCard
                        fileName={file.name}
                        fileType={file.name.split(".")[1]?.toUpperCase()}
                    /> :
                    <IconButton
                        onClick={handleFileUploadClick}
                        icon={<Link />}
                    />
                }
            </div>
        </div>
    );
})

export default FileInput;
