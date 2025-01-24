import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const {
  env:{
      imagekit:{publicKey,urlEndpoint},
  },
} = config;



const authenticator = async() =>{
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if(!response.ok){
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`,);
    }

    const data = await response.json();
    const {signature,expire,token} = data;

    return{
      signature,
      expire,
      token,
    }

  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
}

const ImageUpload = ({onFileChange}:{onFileChange:(filePath:string) => void}) =>{
  
  const IKUploadRef = useRef(null);
  const [file,setFile] = useState<{filePath:string } | null >(null);
const onError = (error:any) =>{
  console.log(error);
  toast({
    title: "Image uploaded failed",
    description: `Your image could not be uploaded. Please try again`,
    variant:"destructive",
  })
  
};
const onSucces = (res:any) => {
  setFile(res);
  onFileChange(res.filePath);

  toast({
    title: "Image uploaded Successfully",
    description: `${res.filePath} uploaded Successfully`,
  })
};

  return (
    <ImageKitProvider
    publicKey={publicKey}
    urlEndpoint={urlEndpoint}
    authenticator={authenticator}
    >
<IKUpload className="hidden" ref={IKUploadRef} onError={onError} onSuccess={onSucces} fileName="text-upload.png"/>
    <button className="upload-btn" onClick={(e) => {
      e.preventDefault();

      if(IKUploadRef.current) {
        // @ts-ignore 
        IKUploadRef.current?.click();
      }
    }}>
      <Image
      src='/icons/upload.svg'
      alt="upload-icon"
      width={20}
      height={20}
      className="object-contain"
      />
      <p className="text-base text-light-100">Upload a File</p>
      
      {file && <p className="upload-filename">{file.filePath} </p>}

     {file && (
      <IKImage
      alt={file.filePath}
      path={file.filePath}
      width={500}
      height={300}
      />
     )}
    </button>
    
    </ImageKitProvider>
  )
}

export default ImageUpload
