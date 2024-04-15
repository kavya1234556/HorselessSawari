import { MdDeleteOutline } from 'react-icons/md';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { cn } from '@/lib/utils';

interface DeleteModalProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  onDelete?: () => void;
  className?: string;
}

const DeleteModal = ({
  open,
  onClose,
  title,
  onDelete,
  className,
}: DeleteModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={cn('p-0 max-w-[500px]', className)}>
        <div className='p-[30px]'>
          <div className='flex justify-center'>
            <MdDeleteOutline />
          </div>
          <h3 className='text-center text-[20px] font-normal text-black mt-10'>
            Are you sure want to delete this {title}?
          </h3>
          <div className='flex justify-center gap-5 mt-[50px]'>
            <Button variant='secondary' className='w-[173px]' onClick={onClose}>
              Cancel
            </Button>
            <Button className='w-[173px]' onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
