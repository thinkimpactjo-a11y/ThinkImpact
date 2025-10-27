import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  banners: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { uploadedUrl: file.url };
  }),

  consulting: f({
    image: { maxFileSize: "2MB", maxFileCount: 5 },
  }).onUploadComplete(async ({ file }) => {
    return { uploadedUrl: file.url };
  }),

  ourTeam: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { uploadedUrl: file.url };
  }),

  ourClients: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { uploadedUrl: file.url };
  }),

  services: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { uploadedUrl: file.url };
  }),

  courses: f({
    image: { maxFileSize: "2MB", maxFileCount: 2 },
  }).onUploadComplete(async ({ file }) => {
    return { uploadedUrl: file.url };
  }),

  settings: f({
    video: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    return { uploadedUrl: file.url };
  }),
  cvUpload: f({
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    return {
      uploadedUrl: file.url,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
