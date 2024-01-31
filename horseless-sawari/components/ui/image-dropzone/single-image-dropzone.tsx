import { cn } from '@/lib/utils';
import { PreviewFileType } from '@/types/preview-file-types';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../button';
import { useFormField } from '../form';
import CrossIcon from '@/assests/icons/crossIcon';
import ImageUploadIcon from '@/assests/icons/image-upload-icon';

type DropzoneProps = {
  file?: PreviewFileType | undefined | null;
  setFile: React.Dispatch<React.SetStateAction<PreviewFileType | null>>;
  onChange?: (...event: any[]) => void;
  name: string;
};

const SingleImageDropzone = ({
  className,
  file,
  setFile,
}: DropzoneProps & React.ComponentPropsWithoutRef<'div'>) => {
  const { name, setValue } = useFormField();

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.map((file: MediaSource) => {
      const objURL = URL.createObjectURL(file);
      const obj = {
        id: uuidv4(),
        image_path: objURL,
        file,
      };
      setFile(obj);
      setValue(name, acceptedFiles, {
        shouldValidate: true,
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
      'image/webp': [],
      'image/svg+xml': [],
    },
    // maxFiles: 2,
    noClick: true,
    noKeyboard: true,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setValue(name, []);
  };

  return (
    <>
      <div
        {...getRootProps({
          className: cn(
            'flex items-center justify-center border-[1px] border border-purple rounded-full',
            className
          ),
        })}
      >
        <input {...getInputProps()} />
        <div className='relative'>
          {isDragActive ? (
            <div className='h-[208px] flex justify-center items-center'>
              <p>Drop the files here ...</p>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-[20px] pt-[28px]  text-center '>
              <div className='flex flex-col gap-[12px] items-center'>
                <ImageUploadIcon />
                <div className='flex flex-col '>
                  <p className='text-sm font-normal text-gray'>
                    Drag image file to upload
                  </p>
                  <span className='text-xs font-light uppercase text-gray'>
                    or
                  </span>
                </div>
              </div>
              <Button type='button' className='w-[75px] ' onClick={open}>
                BROWSE
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className='gap-[20px]'>
        {!!file && (
          <div key={file.id} className='relative w-1/2 h-10'>
            <img
              src={file.image_path}
              alt={file.image_path}
              className='object-cover h-full w-full'
            />
            <CrossIcon
              height={17}
              width={17}
              type='button'
              className='absolute top-[9px] z-30 right-[9px] cursor-pointer'
              onClick={removeFile}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default SingleImageDropzone;
