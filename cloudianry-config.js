import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createUrl = ({ version, name, format } = {}) => {
  const baseUrl = "https://res.cloudinary.com/itsmeleonardo/image/upload/";
  const versionFormat = version ? `v${version}/` : "";
  const fileName = `${name}.${format}`;
  return `${baseUrl}f_auto/${versionFormat}${fileName}`;
};

const uploadStream = (buffer) => {
  return new Promise((resolve, reject) => {
    const config = { folder: "cloudianry-test" };
    const cloudinaryDone = (err, result) => {
      return err ? reject(err) : resolve(result);
    };
    cloudinary.v2.uploader.upload_stream(config, cloudinaryDone).end(buffer);
  });
};

export const uploadImage = async (file) => {
  try {
    const {
      public_id: name,
      version,
      format,
    } = await uploadStream(file.buffer);
    const data = createUrl({ name, version, format });
    return [data, null];
  } catch (error) {
    console.error({ error });
    return [null, error];
  }
};
