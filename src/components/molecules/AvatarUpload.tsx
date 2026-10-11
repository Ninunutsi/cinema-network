import { useRef, useState, type ChangeEvent } from "react";
import { ImagePlus, Upload, X } from "lucide-react";

import { AVATAR_ACCEPTED_TYPES } from "../../features/auth/auth.schemas";
import { Button } from "../ui/button";

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
  const [preview, setPreview] = useState<{
    file: File;
    url: string;
  }>();

  const previewUrl = preview?.file === value ? preview?.url : undefined;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setPreview((current) => {
        if (current) URL.revokeObjectURL(current.url);

        return {
          file,
          url: URL.createObjectURL(file),
        };
      });

      onChange(file);
    }

    event.target.value = "";
  };

  const handleRemove = () => {
    setPreview((current) => {
      if (current) URL.revokeObjectURL(current.url);
      return undefined;
    });

    onChange(undefined);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          aria-label="Choose avatar image"
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg  bg-surface transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar preview"
              className="size-full object-cover"
            />
          ) : (
            <Upload
              size={12}
              strokeWidth={1.5}
              className="text-muted-foreground"
            />
          )}
        </button>

        <div className="min-w-0 flex-1 space-y-1 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-foreground">
              Upload avatar (optional)
            </p>

            <p className="text-xs text-muted-foreground">JPG, PNG or WEBP</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {value && (
              <Button
                variant="default"
                size="sm"
                disabled={disabled}
                onClick={handleRemove}
                className="h-4 gap-1 px-2 text-xs cursor-pointer text-muted bg-background hover:bg-background"
              >
                <X size={14} />
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={AVATAR_ACCEPTED_TYPES.join(",")}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        data-testid="avatar-input"
      />

      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
