import { cn } from "@/lib/utils";
import { Input } from "../../input";

type TImageUploader = {
    imageFiles: File[] | [];
    label?: string;
    className?: string;
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
    setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  };

const EPImageUploader = ({
    label = "Upload Images",
    className,
    setImageFiles,
    setImagePreview,
  }: TImageUploader) => {

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const file = event.target.files![0];
       setImageFiles((prev) => [...prev, file]);
      
       if(file){
        const reader = new FileReader()

        reader.onloadend = ()=> {
            setImagePreview((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file);
       }
       event.target.value = ""
    }

    return (
        <div  className={cn("flex flex-col items-center w-full gap-4", className)}>
           <Input 
           onChange={handleImageChange}
            type="file"  multiple 
            accept="image/*"
            className="hidden"
            id="image-uploader"
             />
            <label
            htmlFor="image-uploader"
            className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition" > {label}</label>
            {/* <div>
               {imagePreview.map((prview, idx) => (
                <Image key={idx} src={prview} width={500} height={500} alt="images" />
                ))} 
            </div> */}
        </div>
    );
};

export default EPImageUploader;