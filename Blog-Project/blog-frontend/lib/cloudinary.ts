import AxiosInstance from "@/api/axios/axios";

export async function uploadImage(file: File, folder: "blogs" | "profiles") {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);
  const response = await AxiosInstance.post("/uploads/image", formData);
  return response.data.data.url as string;
}