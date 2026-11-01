


export default function FileUpload() {
    return (
        <div>
            <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="file" className="font-semibold">Upload File</label>
                    <input type="file" id="file" capture="environment" accept="image/*" name="file" className="border p-2 rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
        </div>
    )
}  