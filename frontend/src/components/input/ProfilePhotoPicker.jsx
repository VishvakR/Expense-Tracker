import React, { useState, useRef} from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

function ProfilePhotoPicker({ ProfilePic, setProfilePic }) {
    const inputRef = React.useRef(null);
    const [previewUrl, setPreviewUrl] = React.useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Update the image state
            setProfilePic(file);

            // Generate preview URL from the file
            const preview = URL.createObjectURL(file);

            setPreviewUrl(preview);
        }
    }


    const handleRemoveImage = () => {
        setProfilePic(null);
        setPreviewUrl(null);
        if (inputRef.current) {
            inputRef.current.value = ""; // clear file input
        }
    }


    const onChooseFile = ()=> {
        inputRef.current.click();
    }
    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={handleImageChange}
            />
            {!ProfilePic ? (
                <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full relative">
                    <LuUser size={60} className="text-4xl text-primary" />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full p-1 absolute -bottom-1 -right-1"
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img 
                        src={previewUrl} 
                        alt="profile Photo"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full p-1 absolute -bottom-1 -right-1"
                        onClick={handleRemoveImage}
                        >
                        <LuTrash size={14} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoPicker