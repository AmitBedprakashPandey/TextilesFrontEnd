import { Spinner } from "./ui/spinner";

export default function CustomLoading() {
    return (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="z-50 bg-white p-6 rounded-lg shadow-lg">
                <Spinner color="#000" className="size-10" />
            </div>
        </div>

    )
}