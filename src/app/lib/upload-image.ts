import cloudinary from "./cloudinary";

export const UploadImage = async (file: File, folder: string, tags: string) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer: any = Buffer.from(arrayBuffer);

  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: tags,
          folder: folder,
          upload_preset: "MyStore",
          resource_type: "image",
          format: "jpeg" || "png" || "jpg",
          overwrite: false,
          type: "upload",
        },
        (error, result) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(result);
          }
        }
      )
      .end(buffer);
  });
};

export const DeleteImage = async (public_id: any) => {
  return await new Promise((resolve, reject) => {
    try {
      const result = cloudinary.api.delete_resources(public_id);
      // const result = cloudinary.uploader.destroy(public_id);
      return resolve(result);
    } catch (error: any) {
      reject(new Error(error.message));
    }
  });
};
