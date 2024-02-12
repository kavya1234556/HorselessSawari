import { v4 as uuidv4 } from 'uuid';
import { PreviewFileType } from '@/types/preview-file-types';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormField } from '../form';
import { cn } from '@/lib/utils';
import ImageUploadIcon from '@/assests/icons/image-upload-icon';
import { Button } from '../button';
import CrossIcon from '@/assests/icons/crossIcon';

type DropzoneProps = {
  className?: string;
  files?: PreviewFileType[] | undefined | null;
  setFiles: React.Dispatch<React.SetStateAction<PreviewFileType[]>>;
  onChange?: (...event: any[]) => void;
  name: string;
};

const MultipleImageDropzone = ({
  className,
  files,
  setFiles,
}: DropzoneProps & React.ComponentPropsWithoutRef<'div'>) => {
  const { name, setValue, clearErrors } = useFormField();

  useEffect(() => {
    setValue(name, files, {
      shouldDirty: true,
    });
  }, [files]);

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.map((file: MediaSource) => {
      const objURL = URL.createObjectURL(file);
      const obj = {
        id: uuidv4(),
        image_path: objURL,
        file,
      };
      setFiles((prev: PreviewFileType[]) => [...prev, obj]);
    });
    clearErrors(name);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
      'image/webp': [],
    },
    maxFiles: 6,
    noClick: true,
    noKeyboard: true,
    multiple: true,
  });

  const removeFile = (id: number) => {
    setFiles((files: PreviewFileType[]) => {
      const filter = files.filter((file) => file.id !== id);
      setValue(
        name,
        filter?.map((img) => img?.image_path)
      );
      return filter;
    });
  };

  return (
    <>
      <div
        {...getRootProps({
          className: cn(
            'flex items-center justify-center border-[1px] border-dashed border-blue2 rounded-[5px]',
            className
          ),
        })}
      >
        <input {...getInputProps()} />
        <div className='relative'>
          {isDragActive ? (
            <div className='h-[238px] flex justify-center items-center'>
              <p>Drop the files here ...</p>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-[20px] pt-[28px] pb-[45px] text-center '>
              <div className='flex flex-col gap-[12px] items-center'>
                <ImageUploadIcon />
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-normal text-gray'>
                    Drag image file to upload
                  </p>
                  <span className='text-xs font-light uppercase text-gray'>
                    or
                  </span>
                </div>
              </div>
              <Button type='button' className='w-[176px] ' onClick={open}>
                BROWSE
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className='grid grid-cols-5 gap-[20px]'>
        {files?.map((file: PreviewFileType) => (
          <div key={file.id} className='relative w-full'>
            <img
              src={file.image_path}
              alt={file.image_path}
              className='object-cover h-full w-full'
            />
            <button
              type='button'
              className='absolute top-[9px] z-30 right-[9px] rounded-full cursor-pointer hover:scale-[120%] transition-all'
            >
              <CrossIcon
                height={17}
                width={17}
                onClick={() => {
                  removeFile(file.id as any);
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default MultipleImageDropzone;
