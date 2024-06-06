import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  subject: string;
  content: string;
  photos: File[];
}

interface PostFormProps {
  onSubmit: SubmitHandler<IFormInput>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, files, setFiles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="p-4 max-w-xl mx-auto pop">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            {...register("subject", { required: true })}
            className="border rounded p-2 w-full"
          />
          {errors.subject && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            {...register("content")}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <div
            {...getRootProps({
              className: "dropzone border-dashed border-2 p-4",
            })}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>
        <aside className="mt-4">
          {files.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </aside>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
