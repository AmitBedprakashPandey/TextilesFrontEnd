import FileUpload from "./FileUpload";

export default function FileUploadPage() {
    return (
        <div className="flex flex-col gap-5 p-5">
            <h1 className="text-2xl font-bold">File Upload</h1>
            <FileUpload />
        </div>
    );
}