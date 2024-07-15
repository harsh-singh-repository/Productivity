"use client";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { DefaultImage } from "../../../constant/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | null>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [image, setImage] = useState<Array<Record<string, any>>>([
    DefaultImage,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImage(newImages);
        } else {
          console.log("Failed to get Iamges form Unsplash");
        }
      } catch (error) {
        console.log(error);
        setImage(DefaultImage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="p-6 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
        </div>
      </>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {image.map((image) => (
          <div
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            key={image.id}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image?.id}|${image.urls?.thumb} | ${image.urls?.full}  | ${image.links?.html} | ${image.links?.name}`}
            />
            <Image
              fill
              src={image.urls?.thumb}
              className="object-cover rounded-sm"
              alt="Unsplash Images"
            />
            {selectedImageId === image.id && (
              <div className="absolute insert-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={"image.links.html"}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {image.user?.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
