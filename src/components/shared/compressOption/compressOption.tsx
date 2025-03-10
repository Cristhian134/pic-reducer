"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { IMAGES_FORMAT } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useImages } from "@/hooks/useImages";
import { IMAGE_STATES_CONST } from "@/constants";
import { useSettings } from "@/hooks/useSettings";
import { SettingsFormType } from "@/types";
import clsx from "clsx";
import { useMobile } from "@/hooks/useMobile";

const formSchema = z.object({
  convertTo: z.enum(IMAGES_FORMAT).nullable(),
  quality: z.coerce.number().int().gte(0).lte(100),
  maxSize: z.coerce.number().gte(0).nullable(),
  sufix: z.string(),
  maxWidth: z.coerce.number().gte(0).nullable(),
  maxHeight: z.coerce.number().gte(0).nullable(),
});

export function CompressOption() {
  const { images, processImage, editImage } = useImages();
  const { settings, setSettings, open } = useSettings();
  const isMobile = useMobile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...settings,
    },
  });

  const handleChangeQuality = (field: any, value: any) => {
    if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 100) {
      setSettings((prev: SettingsFormType) => ({
        ...prev,
        [field.name]: Number(value).toString(),
      }));
    }
  };

  const handleChangeSizes = (field: any, value: any) => {
    if (/^\d*$/.test(value) && Number(value) >= 0) {
      setSettings((prev: SettingsFormType) => ({
        ...prev,
        [field.name]: Number(value).toString(),
      }));
    }
  };

  const handleChangeOption = (field: any, value: string) => {
    setSettings((prev: SettingsFormType) => ({
      ...prev,
      [field.name]: value,
    }));
  };

  const handleChangeSwitch = (field: any, value: any) => {
    setSettings((prev: SettingsFormType) => ({
      ...prev,
      [field]: value,
    }));
  };

  function onSubmit() {
    if (images.length < 1) return;
    images.forEach((image) => {
      if (
        image.step === IMAGE_STATES_CONST.IMAGE_PROCESSED ||
        image.step === IMAGE_STATES_CONST.IMAGE_REPROCESSED
      ) {
        editImage({
          id: image.id,
          edit: {
            step: IMAGE_STATES_CONST.IMAGE_REPROCESSING,
          },
        });
        processImage({ image: image, settings });
      }
    });
  }

  return (
    <Form {...form}>
      <div
        className={clsx(
          "settings flex flex-col gap-2 h-[calc(28rem+1.25rem)] bg-white absolute lg:relative ",
          {
            "h-auto top-[5.5rem] lg:w-[calc(100%-2rem)] md:w-[calc(100%-2.5rem)] sm:w-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] transform z-[100] -translate-x-[calc(100%+2.5rem)]":
              isMobile,
          },
          {
            "transition-transform duration-200 ease-in-out pointer-events-auto transform translate-x-[0rem]":
              open,
          }
        )}
      >
        <form
          id="formSettings"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4  border-gray-100 border-[1px] rounded-lg p-2  overflow-y-auto overflow-x-hidden processedFileList"
        >
          <FormField
            control={form.control}
            name="quality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quality</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center m-0">
                    <Slider
                      value={[settings.quality]}
                      onValueChange={(value) => {
                        handleChangeQuality(field, value[0]);
                      }}
                      max={100}
                      step={1}
                    />
                    <Input
                      className="w-12 p-1 text-center"
                      value={settings.quality}
                      type="number"
                      onChange={(e) => {
                        handleChangeQuality(field, e.target.value);
                      }}
                    />
                    %
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="convertTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Convert To</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center">
                    <Select
                      disabled={!settings.enableConvertTo}
                      onValueChange={(value) =>
                        handleChangeOption(field, value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {IMAGES_FORMAT.map((format, idx) => (
                          <SelectItem value={format} key={idx}>
                            {format.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Switch
                      checked={settings.enableConvertTo}
                      onCheckedChange={(value) =>
                        handleChangeSwitch("enableConvertTo", value)
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sufix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Sufix</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: -compressed, -converted"
                    {...field}
                    value={settings.sufix}
                    onChange={(e) => {
                      handleChangeOption(field, e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2">
            <span className="flex-1 w-full border-gray-100 border-t-[0.25px]"></span>

            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium leading-none whitespace-nowrap">
                Keep Resolution
              </span>
              <Switch
                checked={settings.keepResolution}
                onCheckedChange={(value) =>
                  handleChangeSwitch("keepResolution", value)
                }
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="maxWidth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Width</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder=""
                      disabled={settings.keepResolution}
                      value={settings.maxWidth}
                      onChange={(e) => {
                        handleChangeSizes(field, e.target.value);
                      }}
                    />
                    px
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxHeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Height</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder=""
                      disabled={settings.keepResolution}
                      value={settings.maxHeight}
                      onChange={(e) => {
                        handleChangeSizes(field, e.target.value);
                      }}
                      type="number"
                    />
                    px
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
        <Button type="submit" form="formSettings">
          Compress
        </Button>
      </div>
    </Form>
  );
}
