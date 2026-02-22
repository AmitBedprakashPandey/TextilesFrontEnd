
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog";

interface props {
open: boolean,
close: () => void,
confirm: () => void
lable?: string
}
    
export default function CustomeCofirmDailog({ close, confirm , open, lable = "Delete" }: props) {
    return <AlertDialog open={open} onOpenChange={(open) => {
        if (!open) {
            close()
        }
    }}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 text-white focus:outline-red-800 outline" autoFocus onClick={confirm}>{lable}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>  
}