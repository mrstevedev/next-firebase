import { _Object } from "@aws-sdk/client-s3";

export type UploadFormProps = {
    isUploading: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUploadFileToS3: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export type S3Files = {
    items: _Object[];
    url: string;
    handleDeleteFileConfirm: (fileName: string) => void;
};

export type Files = {
    Etag: string;
    Key: string;
    LastModiefied: Date;
    Size: number;
    StorageClass: string;
};
