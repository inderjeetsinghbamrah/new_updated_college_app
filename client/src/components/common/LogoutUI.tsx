import { Button } from '../ui/button'
import { Dialog,DialogClose,DialogContent,DialogDescription,DialogTrigger,DialogTitle,DialogFooter } from '../ui/dialog'
import Logout from './Logout'

const LogoutUI = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Logout</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription>Are you Sure you want to Logout?</DialogDescription>
                    <DialogFooter className='flex justify-between'>
                        <Logout/>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default LogoutUI
