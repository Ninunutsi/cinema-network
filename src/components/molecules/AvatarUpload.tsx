import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Camera, User } from "lucide-react";
import { AVATAR_ACCEPTED_TYPES } from "../../schemas/auth.schemas";

interface AvatarUploadProps {
  value?: File;
  onChange: (file?: File) => void;
  error?: string;
  disabled?: boolean;
}

export function AvatarUpload({
  value,
  onChange,
  error,
  disabled,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();

  // Create a preview URL for the selected file and release it when it changes/unmounts.
  useEffect(() => {
    if (!value) {
      setPreviewUrl(undefined);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0]);
    // Reset so selecting the same file again still fires onChange.
    event.target.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        aria-label="Upload avatar"
        className="group relative flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-muted-foreground bg-white/5"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Avatar preview"
            className="size-full object-cover"
          />
        ) : (
          <User size={36} className="text-muted-foreground" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <Camera size={20} className="text-white" />
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={AVATAR_ACCEPTED_TYPES.join(",")}
        onChange={handleFileChange}
        className="hidden"
        data-testid="avatar-input"
      />

      <div className="flex items-center gap-3 text-xs">
        <span className="text-muted-foreground">
          {value ? value.name : "Upload avatar (optional)"}
        </span>
        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="cursor-pointer text-danger hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
