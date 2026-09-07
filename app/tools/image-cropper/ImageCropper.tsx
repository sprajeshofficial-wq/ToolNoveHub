"use client";

import {
  ChangeEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type CropMode = "drag" | "precise";

type ResizeDirection =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw";

type ImageInfo = {
  width: number;
  height: number;
  type: string;
  size: number;
};

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MIN_CROP_SIZE = 20;
const MAX_OUTPUT_DIMENSION = 10000;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function toInteger(value: string | number, fallback = 0) {
  const parsed =
    typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed)) return fallback;

  return Math.round(parsed);
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getExtension(format: string) {
  if (format === "image/jpeg") return "jpg";
  if (format === "image/webp") return "webp";

  return "png";
}

function getMimeType(format: string) {
  if (format === "image/jpeg") return "image/jpeg";
  if (format === "image/webp") return "image/webp";

  return "image/png";
}

function normalizeRotation(value: number) {
  const normalized = value % 360;

  return normalized < 0
    ? normalized + 360
    : normalized;
}

function getRotatedCanvasSize(
  width: number,
  height: number,
  rotation: number
) {
  const radians =
    (rotation * Math.PI) / 180;

  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));

  return {
    width: Math.max(
      1,
      Math.ceil(width * cos + height * sin)
    ),
    height: Math.max(
      1,
      Math.ceil(width * sin + height * cos)
    ),
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.onerror = () =>
      reject(new Error("Unable to load image."));

    image.src = src;
  });
}

export default function ImageCropper() {
  const [imageSrc, setImageSrc] = useState("");
  const [imageInfo, setImageInfo] =
    useState<ImageInfo | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const objectUrlRef =
    useRef<string | null>(null);

  const [cropMode, setCropMode] =
    useState<CropMode>("drag");

  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(300);
  const [cropHeight, setCropHeight] = useState(300);

  const imageContainerRef =
    useRef<HTMLDivElement | null>(null);

  const cropActionRef =
    useRef<{
      type: "draw" | "move" | "resize";
      startX: number;
      startY: number;
      originalX: number;
      originalY: number;
      originalWidth: number;
      originalHeight: number;
      direction?: ResizeDirection;
    } | null>(null);

  const [croppedSrc, setCroppedSrc] = useState("");
  const croppedObjectUrlRef =
    useRef<string | null>(null);

  const [croppedInfo, setCroppedInfo] =
    useState<ImageInfo | null>(null);

  const [zoom, setZoom] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);

  const [flipHorizontal, setFlipHorizontal] =
    useState(false);

  const [flipVertical, setFlipVertical] =
    useState(false);

  const [aspectRatio, setAspectRatio] =
    useState("custom");

  const [lockAspectRatio, setLockAspectRatio] =
    useState(true);

  const [outputWidth, setOutputWidth] =
    useState(300);

  const [outputHeight, setOutputHeight] =
    useState(300);

  const [outputFormat, setOutputFormat] =
    useState("image/png");

  const [quality, setQuality] =
    useState(0.9);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function clearFeedback() {
    setError("");
    setMessage("");
  }

  function resetAdjustments() {
    setZoom(100);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setAspectRatio("custom");
    setLockAspectRatio(true);
  }

  function clearCroppedImage() {
    if (croppedObjectUrlRef.current) {
      URL.revokeObjectURL(
        croppedObjectUrlRef.current
      );

      croppedObjectUrlRef.current = null;
    }

    setCroppedSrc("");
    setCroppedInfo(null);
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    clearFeedback();
    clearCroppedImage();

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a supported image file."
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        "Please choose an image smaller than 20 MB."
      );
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(
        objectUrlRef.current
      );
    }

    const url =
      URL.createObjectURL(file);

    objectUrlRef.current = url;

    const image = new Image();

    image.onload = () => {
      const width = image.naturalWidth;
      const height = image.naturalHeight;

      setImageSrc(url);

      setImageInfo({
        width,
        height,
        type: file.type,
        size: file.size,
      });

      const initialWidth = Math.min(width, 860);
      const initialHeight = Math.min(height, 573);

      const scale = Math.min(
        initialWidth / width,
        initialHeight / height
      );

      const cropW = Math.max(
        1,
        Math.round(width * scale)
      );

      const cropH = Math.max(
        1,
        Math.round(height * scale)
      );

      setCropX(
        Math.round((width - cropW) / 2)
      );

      setCropY(
        Math.round((height - cropH) / 2)
      );

      setCropWidth(cropW);
      setCropHeight(cropH);

      setOutputWidth(cropW);
      setOutputHeight(cropH);

      resetAdjustments();

      setMessage(
        "Image loaded. Select the area you want to keep."
      );
    };

    image.onerror = () => {
      setError(
        "Unable to load the selected image."
      );

      URL.revokeObjectURL(url);

      if (objectUrlRef.current === url) {
        objectUrlRef.current = null;
      }
    };

    image.src = url;
  }

  function resetAll() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(
        objectUrlRef.current
      );

      objectUrlRef.current = null;
    }

    clearCroppedImage();

    setImageSrc("");
    setImageInfo(null);

    setCropX(0);
    setCropY(0);
    setCropWidth(300);
    setCropHeight(300);

    setOutputWidth(300);
    setOutputHeight(300);

    setOutputFormat("image/png");
    setQuality(0.9);

    resetAdjustments();

    clearFeedback();

    cropActionRef.current = null;

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function pointerToImage(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    const container =
      imageContainerRef.current;

    if (!container || !imageInfo) {
      return { x: 0, y: 0 };
    }

    const rect =
      container.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      return { x: 0, y: 0 };
    }

    const x = clamp(
      event.clientX - rect.left,
      0,
      rect.width
    );

    const y = clamp(
      event.clientY - rect.top,
      0,
      rect.height
    );

    return {
      x:
        (x / rect.width) *
        imageInfo.width,
      y:
        (y / rect.height) *
        imageInfo.height,
    };
  }

  function startDrawing(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    if (
      cropMode !== "drag" ||
      !imageInfo
    ) {
      return;
    }

    const point =
      pointerToImage(event);

    cropActionRef.current = {
      type: "draw",
      startX: point.x,
      startY: point.y,
      originalX: point.x,
      originalY: point.y,
      originalWidth: 1,
      originalHeight: 1,
    };

    setCropX(Math.round(point.x));
    setCropY(Math.round(point.y));
    setCropWidth(1);
    setCropHeight(1);

    clearFeedback();

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  }

  function startMoving(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    if (
      cropMode !== "drag" ||
      !imageInfo
    ) {
      return;
    }

    event.stopPropagation();

    const point =
      pointerToImage(event);

    const inside =
      point.x >= cropX &&
      point.x <= cropX + cropWidth &&
      point.y >= cropY &&
      point.y <= cropY + cropHeight;

    if (!inside) return;

    cropActionRef.current = {
      type: "move",
      startX: point.x,
      startY: point.y,
      originalX: cropX,
      originalY: cropY,
      originalWidth: cropWidth,
      originalHeight: cropHeight,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  }

  function startResize(
    event: ReactPointerEvent<HTMLDivElement>,
    direction: ResizeDirection
  ) {
    if (
      cropMode !== "drag" ||
      !imageInfo
    ) {
      return;
    }

    event.stopPropagation();

    const point =
      pointerToImage(event);

    cropActionRef.current = {
      type: "resize",
      startX: point.x,
      startY: point.y,
      originalX: cropX,
      originalY: cropY,
      originalWidth: cropWidth,
      originalHeight: cropHeight,
      direction,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    const action =
      cropActionRef.current;

    if (!action || !imageInfo) {
      return;
    }

    const point =
      pointerToImage(event);

    if (action.type === "draw") {
      const x = Math.min(
        action.startX,
        point.x
      );

      const y = Math.min(
        action.startY,
        point.y
      );

      const width = Math.abs(
        point.x - action.startX
      );

      const height = Math.abs(
        point.y - action.startY
      );

      const safeX = clamp(
        x,
        0,
        Math.max(
          0,
          imageInfo.width - MIN_CROP_SIZE
        )
      );

      const safeY = clamp(
        y,
        0,
        Math.max(
          0,
          imageInfo.height - MIN_CROP_SIZE
        )
      );

      const safeWidth = clamp(
        width,
        MIN_CROP_SIZE,
        imageInfo.width - safeX
      );

      const safeHeight = clamp(
        height,
        MIN_CROP_SIZE,
        imageInfo.height - safeY
      );

      setCropX(Math.round(safeX));
      setCropY(Math.round(safeY));
      setCropWidth(Math.round(safeWidth));
      setCropHeight(Math.round(safeHeight));

      return;
    }

    if (action.type === "move") {
      const dx =
        point.x - action.startX;

      const dy =
        point.y - action.startY;

      const newX = clamp(
        action.originalX + dx,
        0,
        imageInfo.width -
          action.originalWidth
      );

      const newY = clamp(
        action.originalY + dy,
        0,
        imageInfo.height -
          action.originalHeight
      );

      setCropX(Math.round(newX));
      setCropY(Math.round(newY));

      return;
    }

    if (
      action.type === "resize" &&
      action.direction
    ) {
      let x = action.originalX;
      let y = action.originalY;
      let width =
        action.originalWidth;
      let height =
        action.originalHeight;

      const dx =
        point.x - action.startX;

      const dy =
        point.y - action.startY;

      const direction =
        action.direction;

      if (direction.includes("e")) {
        width = clamp(
          action.originalWidth + dx,
          MIN_CROP_SIZE,
          imageInfo.width -
            action.originalX
        );
      }

      if (direction.includes("s")) {
        height = clamp(
          action.originalHeight + dy,
          MIN_CROP_SIZE,
          imageInfo.height -
            action.originalY
        );
      }

      if (direction.includes("w")) {
        const newX = clamp(
          action.originalX + dx,
          0,
          action.originalX +
            action.originalWidth -
            MIN_CROP_SIZE
        );

        x = newX;

        width =
          action.originalWidth -
          (newX - action.originalX);
      }

      if (direction.includes("n")) {
        const newY = clamp(
          action.originalY + dy,
          0,
          action.originalY +
            action.originalHeight -
            MIN_CROP_SIZE
        );

        y = newY;

        height =
          action.originalHeight -
          (newY - action.originalY);
      }

      setCropX(Math.round(x));
      setCropY(Math.round(y));
      setCropWidth(Math.round(width));
      setCropHeight(Math.round(height));
    }
  }

  function endPointer(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    cropActionRef.current = null;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer capture may already be released.
    }
  }

  function updateCropField(
    field: "x" | "y" | "width" | "height",
    value: number
  ) {
    if (!imageInfo) return;

    const safeValue = Math.max(
      0,
      toInteger(value)
    );

    if (field === "x") {
      setCropX(
        clamp(
          safeValue,
          0,
          Math.max(
            0,
            imageInfo.width -
              MIN_CROP_SIZE
          )
        )
      );

      return;
    }

    if (field === "y") {
      setCropY(
        clamp(
          safeValue,
          0,
          Math.max(
            0,
            imageInfo.height -
              MIN_CROP_SIZE
          )
        )
      );

      return;
    }

    if (field === "width") {
      const maxWidth =
        imageInfo.width - cropX;

      setCropWidth(
        clamp(
          safeValue,
          MIN_CROP_SIZE,
          Math.max(
            MIN_CROP_SIZE,
            maxWidth
          )
        )
      );

      return;
    }

    const maxHeight =
      imageInfo.height - cropY;

    setCropHeight(
      clamp(
        safeValue,
        MIN_CROP_SIZE,
        Math.max(
          MIN_CROP_SIZE,
          maxHeight
        )
      )
    );
  }

  function resetCrop() {
    if (!imageInfo) return;

    setCropX(0);
    setCropY(0);
    setCropWidth(imageInfo.width);
    setCropHeight(imageInfo.height);

    clearFeedback();

    setMessage(
      "Crop area reset to the full image."
    );
  }

  function fitToImage() {
    resetCrop();
  }

  function applyAspectRatio(
    ratio: string
  ) {
    setAspectRatio(ratio);

    if (
      ratio === "custom" ||
      !imageInfo
    ) {
      return;
    }

    const ratios: Record<
      string,
      number
    > = {
      "1:1": 1,
      "4:3": 4 / 3,
      "3:2": 3 / 2,
      "16:9": 16 / 9,
      "9:16": 9 / 16,
    };

    const ratioValue =
      ratios[ratio];

    if (!ratioValue) return;

    let width = cropWidth;
    let height =
      Math.round(
        width / ratioValue
      );

    if (height > imageInfo.height) {
      height = imageInfo.height;
      width = Math.round(
        height * ratioValue
      );
    }

    if (width > imageInfo.width) {
      width = imageInfo.width;
      height = Math.round(
        width / ratioValue
      );
    }

    width = Math.min(
      width,
      imageInfo.width
    );

    height = Math.min(
      height,
      imageInfo.height
    );

    setCropWidth(
      Math.max(1, width)
    );

    setCropHeight(
      Math.max(1, height)
    );

    setCropX(
      Math.max(
        0,
        Math.round(
          (imageInfo.width - width) / 2
        )
      )
    );

    setCropY(
      Math.max(
        0,
        Math.round(
          (imageInfo.height - height) / 2
        )
      )
    );

    clearFeedback();
  }

  async function applyCrop() {
    if (!imageSrc || !imageInfo) {
      setError(
        "Please upload an image first."
      );
      return;
    }

    const safeX = clamp(
      cropX,
      0,
      imageInfo.width - 1
    );

    const safeY = clamp(
      cropY,
      0,
      imageInfo.height - 1
    );

    const safeWidth = clamp(
      cropWidth,
      1,
      imageInfo.width - safeX
    );

    const safeHeight = clamp(
      cropHeight,
      1,
      imageInfo.height - safeY
    );

    if (
      safeWidth <= 0 ||
      safeHeight <= 0
    ) {
      setError(
        "Please select a valid crop area."
      );
      return;
    }

    clearFeedback();

    try {
      const image =
        await loadImage(imageSrc);

      const canvas =
        document.createElement("canvas");

      canvas.width = safeWidth;
      canvas.height = safeHeight;

      const context =
        canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Canvas is not supported."
        );
      }

      context.imageSmoothingEnabled =
        true;

      context.imageSmoothingQuality =
        "high";

      context.drawImage(
        image,
        safeX,
        safeY,
        safeWidth,
        safeHeight,
        0,
        0,
        safeWidth,
        safeHeight
      );

      const blob =
        await new Promise<Blob | null>(
          (resolve) =>
            canvas.toBlob(
              resolve,
              "image/png"
            )
        );

      if (!blob) {
        throw new Error(
          "Unable to create cropped image."
        );
      }

      clearCroppedImage();

      const url =
        URL.createObjectURL(blob);

      croppedObjectUrlRef.current =
        url;

      setCroppedSrc(url);

      setCroppedInfo({
        width: safeWidth,
        height: safeHeight,
        type: "image/png",
        size: blob.size,
      });

      setOutputWidth(safeWidth);
      setOutputHeight(safeHeight);

      resetAdjustments();

      setMessage(
        "Crop complete. You can now adjust the image and choose the final output format."
      );

      window.setTimeout(() => {
        document
          .getElementById(
            "manual-adjustments"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch {
      setError(
        "Unable to create the cropped image. Please try another image."
      );
    }
  }

  function changeOutputWidth(
    value: number
  ) {
    const safeValue = clamp(
      toInteger(value, 1),
      1,
      MAX_OUTPUT_DIMENSION
    );

    setOutputWidth(safeValue);

    if (
      lockAspectRatio &&
      croppedInfo &&
      croppedInfo.width > 0
    ) {
      setOutputHeight(
        clamp(
          Math.round(
            safeValue *
              (croppedInfo.height /
                croppedInfo.width)
          ),
          1,
          MAX_OUTPUT_DIMENSION
        )
      );
    }
  }

  function changeOutputHeight(
    value: number
  ) {
    const safeValue = clamp(
      toInteger(value, 1),
      1,
      MAX_OUTPUT_DIMENSION
    );

    setOutputHeight(safeValue);

    if (
      lockAspectRatio &&
      croppedInfo &&
      croppedInfo.height > 0
    ) {
      setOutputWidth(
        clamp(
          Math.round(
            safeValue *
              (croppedInfo.width /
                croppedInfo.height)
          ),
          1,
          MAX_OUTPUT_DIMENSION
        )
      );
    }
  }

  const previewStyle =
    useMemo(
      () => ({
        filter: `
          brightness(${brightness}%)
          contrast(${contrast}%)
          saturate(${saturation}%)
        `,
        transform: `
          scale(${zoom / 100})
          rotate(${rotation}deg)
          scaleX(${flipHorizontal ? -1 : 1})
          scaleY(${flipVertical ? -1 : 1})
        `,
        transition:
          "transform 0.15s ease, filter 0.15s ease",
      }),
      [
        brightness,
        contrast,
        saturation,
        zoom,
        rotation,
        flipHorizontal,
        flipVertical,
      ]
    );

  async function downloadFinalImage() {
    if (!croppedSrc || !croppedInfo) {
      setError(
        "Please apply a crop before downloading."
      );
      return;
    }

    const safeWidth = clamp(
      toInteger(outputWidth),
      1,
      MAX_OUTPUT_DIMENSION
    );

    const safeHeight = clamp(
      toInteger(outputHeight),
      1,
      MAX_OUTPUT_DIMENSION
    );

    clearFeedback();

    try {
      const image =
        await loadImage(croppedSrc);

      const radians =
        (rotation * Math.PI) / 180;

      const baseWidth =
        safeWidth;

      const baseHeight =
        safeHeight;

      const rotatedSize =
        getRotatedCanvasSize(
          baseWidth,
          baseHeight,
          rotation
        );

      const canvas =
        document.createElement("canvas");

      canvas.width =
        rotatedSize.width;

      canvas.height =
        rotatedSize.height;

      const context =
        canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Canvas is not supported."
        );
      }

      context.imageSmoothingEnabled =
        true;

      context.imageSmoothingQuality =
        "high";

      context.save();

      context.translate(
        canvas.width / 2,
        canvas.height / 2
      );

      context.rotate(radians);

      context.scale(
        flipHorizontal ? -1 : 1,
        flipVertical ? -1 : 1
      );

      context.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
      `;

      const drawWidth =
        baseWidth *
        (zoom / 100);

      const drawHeight =
        baseHeight *
        (zoom / 100);

      context.drawImage(
        image,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );

      context.restore();

      const mimeType =
        getMimeType(outputFormat);

      const blob =
        await new Promise<Blob | null>(
          (resolve) =>
            canvas.toBlob(
              resolve,
              mimeType,
              mimeType ===
              "image/png"
                ? undefined
                : quality
            )
        );

      if (!blob) {
        throw new Error(
          "Unable to create output."
        );
      }

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `cropped-image-${canvas.width}x${canvas.height}.${getExtension(
          mimeType
        )}`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.setTimeout(
        () => URL.revokeObjectURL(url),
        1000
      );

      setMessage(
        `Image downloaded successfully — ${canvas.width} × ${canvas.height} px.`
      );
    } catch {
      setError(
        "Unable to create the final image. Please try again."
      );
    }
  }

  const cropStyle =
    imageInfo
      ? {
          left: `${
            (cropX /
              imageInfo.width) *
            100
          }%`,
          top: `${
            (cropY /
              imageInfo.height) *
            100
          }%`,
          width: `${
            (cropWidth /
              imageInfo.width) *
            100
          }%`,
          height: `${
            (cropHeight /
              imageInfo.height) *
            100
          }%`,
        }
      : {};

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(
          objectUrlRef.current
        );
      }

      if (
        croppedObjectUrlRef.current
      ) {
        URL.revokeObjectURL(
          croppedObjectUrlRef.current
        );
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
              Image Tool
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Image Cropper
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Crop, resize, rotate, adjust, and
              download images directly in your
              browser.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label
            htmlFor="image-upload"
            className="block text-sm font-bold text-gray-900"
          >
            Upload Image
          </label>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row">
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block flex-1 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-blue-600 file:px-5 file:py-3 file:font-semibold file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {imageSrc && (
              <button
                type="button"
                onClick={resetAll}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset All
              </button>
            )}
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Maximum file size: 20 MB. Supported
            formats depend on your browser.
          </p>
        </section>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {message && (
          <div
            role="status"
            aria-live="polite"
            className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {message}
          </div>
        )}

        {!imageSrc ? (
          <section className="mt-8 rounded-2xl border-2 border-dashed border-gray-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
              ✂️
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Upload an image to start
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
              Select an image, choose a crop area,
              make optional adjustments, and download
              the result in your preferred format.
            </p>
          </section>
        ) : (
          <>
            <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  1
                </span>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Choose Crop Method
                  </h2>

                  <p className="text-sm text-gray-600">
                    Use the interactive crop area or
                    enter exact pixel values.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  aria-pressed={
                    cropMode === "drag"
                  }
                  onClick={() =>
                    setCropMode("drag")
                  }
                  className={`rounded-xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    cropMode === "drag"
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <h3 className="font-bold text-gray-900">
                    ✋ Drag & Crop
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Draw, move, and resize the crop
                    area interactively.
                  </p>

                  <span className="mt-4 inline-block rounded-md bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
                    Recommended
                  </span>
                </button>

                <button
                  type="button"
                  aria-pressed={
                    cropMode === "precise"
                  }
                  onClick={() =>
                    setCropMode("precise")
                  }
                  className={`rounded-xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    cropMode === "precise"
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <h3 className="font-bold text-gray-900">
                    📐 Precise Crop
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Enter exact X, Y, width, and height
                    pixel values.
                  </p>

                  <span className="mt-4 inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600">
                    Pixel precision
                  </span>
                </button>
              </div>
            </section>

            <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    2
                  </span>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Crop Area
                    </h2>

                    <p className="text-sm text-gray-600">
                      Select the portion of the image
                      you want to keep.
                    </p>
                  </div>
                </div>

                {imageInfo && (
                  <div className="text-sm text-gray-500">
                    Original: {imageInfo.width} ×{" "}
                    {imageInfo.height} px ·{" "}
                    {formatFileSize(
                      imageInfo.size
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  <div className="overflow-auto rounded-xl border border-gray-200 bg-gray-100 p-4">
                    <div
                      ref={
                        imageContainerRef
                      }
                      className="relative mx-auto w-fit max-w-full select-none touch-none"
                      onPointerDown={
                        cropMode === "drag"
                          ? startDrawing
                          : undefined
                      }
                      onPointerMove={
                        handlePointerMove
                      }
                      onPointerUp={
                        endPointer
                      }
                      onPointerCancel={
                        endPointer
                      }
                    >
                      <img
                        src={imageSrc}
                        alt="Selected image for cropping"
                        className="block max-h-[650px] max-w-full object-contain"
                        draggable={false}
                      />

                      <div className="pointer-events-none absolute inset-0 bg-black/35" />

                      <div
                        className="absolute border-2 border-blue-500 bg-transparent"
                        style={cropStyle}
                        onPointerDown={
                          cropMode === "drag"
                            ? startMoving
                            : undefined
                        }
                      >
                        <div className="pointer-events-none absolute inset-0">
                          <div className="absolute left-1/3 top-0 h-full border-l border-white/60" />
                          <div className="absolute left-2/3 top-0 h-full border-l border-white/60" />
                          <div className="absolute left-0 top-1/3 w-full border-t border-white/60" />
                          <div className="absolute left-0 top-2/3 w-full border-t border-white/60" />
                        </div>

                        <div className="absolute left-1/2 top-1 -translate-x-1/2 whitespace-nowrap rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white shadow">
                          {cropWidth} ×{" "}
                          {cropHeight}
                        </div>

                        {cropMode === "drag" && (
                          <>
                            <div
                              className="absolute inset-4 cursor-move"
                              onPointerDown={
                                startMoving
                              }
                            />

                            <ResizeHandle
                              direction="nw"
                              position="left-0 top-0"
                              onPointerDown={
                                startResize
                              }
                            />

                            <ResizeHandle
                              direction="ne"
                              position="right-0 top-0"
                              onPointerDown={
                                startResize
                              }
                            />

                            <ResizeHandle
                              direction="sw"
                              position="left-0 bottom-0"
                              onPointerDown={
                                startResize
                              }
                            />

                            <ResizeHandle
                              direction="se"
                              position="right-0 bottom-0"
                              onPointerDown={
                                startResize
                              }
                            />

                            <ResizeHandle
                              direction="n"
                              position="left-1/2 top-0"
                              onPointerDown={
                                startResize
                              }
                            />

                            <ResizeHandle
                              direction="s"
                              position="left-1/2 bottom-0"
                              onPointerDown={
                                startResize
                              }
                            />

                            <ResizeHandle
                              direction="w"
                              position="left-0 top-1/2"
                              onPointerDown={
                                startResize
                              }
                            />

                            <ResizeHandle
                              direction="e"
                              position="right-0 top-1/2"
                              onPointerDown={
                                startResize
                              }
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-700">
                    {cropMode === "drag" ? (
                      <>
                        <strong>Tip:</strong> Drag inside
                        the selected area to move it. Use
                        the corners or edges to resize it.
                      </>
                    ) : (
                      <>
                        <strong>Precise mode:</strong> Use
                        the X, Y, width, and height fields
                        to define the crop area.
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-bold text-gray-900">
                    Crop Settings
                  </h3>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <NumberField
                      id="crop-x"
                      label="X"
                      value={cropX}
                      min={0}
                      onChange={(value) =>
                        updateCropField(
                          "x",
                          value
                        )
                      }
                      suffix="px"
                    />

                    <NumberField
                      id="crop-y"
                      label="Y"
                      value={cropY}
                      min={0}
                      onChange={(value) =>
                        updateCropField(
                          "y",
                          value
                        )
                      }
                      suffix="px"
                    />

                    <NumberField
                      id="crop-width"
                      label="Width"
                      value={cropWidth}
                      min={MIN_CROP_SIZE}
                      onChange={(value) =>
                        updateCropField(
                          "width",
                          value
                        )
                      }
                      suffix="px"
                    />

                    <NumberField
                      id="crop-height"
                      label="Height"
                      value={cropHeight}
                      min={MIN_CROP_SIZE}
                      onChange={(value) =>
                        updateCropField(
                          "height",
                          value
                        )
                      }
                      suffix="px"
                    />
                  </div>

                  <div className="mt-5 grid gap-3">
                    <button
                      type="button"
                      onClick={resetCrop}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      ↶ Reset Crop
                    </button>

                    <button
                      type="button"
                      onClick={fitToImage}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      ⛶ Fit to Image
                    </button>
                  </div>

                  <div className="mt-5 rounded-lg bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Selected Area
                    </p>

                    <p className="mt-2 text-lg font-bold text-gray-900">
                      {cropWidth} ×{" "}
                      {cropHeight} px
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={applyCrop}
                className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Apply Crop & Continue →
              </button>
            </section>

            {croppedSrc &&
              croppedInfo && (
                <>
                  <section
                    id="manual-adjustments"
                    className="mt-8 scroll-mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                        3
                      </span>

                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Manual Adjustments
                        </h2>

                        <p className="text-sm text-gray-600">
                          Fine-tune the cropped image before
                          downloading.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)_260px]">
                      <div className="rounded-xl border border-gray-200 p-4">
                        <div className="border-b border-gray-200 px-3 py-3 text-center text-sm font-bold text-blue-600">
                          Adjusted Preview
                        </div>

                        <div className="mt-4 flex min-h-[300px] items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={croppedSrc}
                            alt="Preview of adjusted cropped image"
                            style={previewStyle}
                            className="max-h-[280px] max-w-full object-contain"
                          />
                        </div>

                        <p className="mt-3 text-center text-xs text-gray-500">
                          Source crop:{" "}
                          {croppedInfo.width} ×{" "}
                          {croppedInfo.height} px
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-200 p-5">
                        <AdjustmentSlider
                          label="Zoom"
                          value={zoom}
                          min={50}
                          max={200}
                          step={1}
                          display={`${zoom}%`}
                          onChange={setZoom}
                          onReset={() =>
                            setZoom(100)
                          }
                        />

                        <AdjustmentSlider
                          label="Brightness"
                          value={brightness}
                          min={0}
                          max={200}
                          step={1}
                          display={`${brightness}%`}
                          onChange={
                            setBrightness
                          }
                          onReset={() =>
                            setBrightness(100)
                          }
                        />

                        <AdjustmentSlider
                          label="Contrast"
                          value={contrast}
                          min={0}
                          max={200}
                          step={1}
                          display={`${contrast}%`}
                          onChange={
                            setContrast
                          }
                          onReset={() =>
                            setContrast(100)
                          }
                        />

                        <AdjustmentSlider
                          label="Saturation"
                          value={saturation}
                          min={0}
                          max={200}
                          step={1}
                          display={`${saturation}%`}
                          onChange={
                            setSaturation
                          }
                          onReset={() =>
                            setSaturation(100)
                          }
                        />

                        <AdjustmentSlider
                          label="Rotate"
                          value={rotation}
                          min={-180}
                          max={180}
                          step={1}
                          display={`${rotation}°`}
                          onChange={setRotation}
                          onReset={() =>
                            setRotation(0)
                          }
                        />

                        <div className="mt-6">
                          <p className="text-sm font-bold text-gray-700">
                            Flip
                          </p>

                          <div className="mt-3 grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              aria-pressed={
                                flipHorizontal
                              }
                              onClick={() =>
                                setFlipHorizontal(
                                  (value) =>
                                    !value
                                )
                              }
                              className={`rounded-lg border px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                flipHorizontal
                                  ? "border-blue-600 bg-blue-50 text-blue-700"
                                  : "border-gray-300 bg-white text-gray-700"
                              }`}
                            >
                              ↔ Horizontal
                            </button>

                            <button
                              type="button"
                              aria-pressed={
                                flipVertical
                              }
                              onClick={() =>
                                setFlipVertical(
                                  (value) =>
                                    !value
                                )
                              }
                              className={`rounded-lg border px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                flipVertical
                                  ? "border-blue-600 bg-blue-50 text-blue-700"
                                  : "border-gray-300 bg-white text-gray-700"
                              }`}
                            >
                              ↕ Vertical
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-gray-200 p-5">
                        <h3 className="font-bold text-gray-900">
                          Aspect Ratio
                        </h3>

                        <select
                          value={aspectRatio}
                          onChange={(event) =>
                            applyAspectRatio(
                              event.target.value
                            )
                          }
                          className="mt-3 h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="custom">
                            Custom
                          </option>
                          <option value="1:1">
                            1:1 Square
                          </option>
                          <option value="4:3">
                            4:3
                          </option>
                          <option value="3:2">
                            3:2
                          </option>
                          <option value="16:9">
                            16:9
                          </option>
                          <option value="9:16">
                            9:16
                          </option>
                        </select>

                        <h3 className="mt-6 font-bold text-gray-900">
                          Output Size
                        </h3>

                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <NumberField
                            id="output-width"
                            label="Width"
                            value={
                              outputWidth
                            }
                            min={1}
                            max={
                              MAX_OUTPUT_DIMENSION
                            }
                            onChange={
                              changeOutputWidth
                            }
                            suffix="px"
                          />

                          <NumberField
                            id="output-height"
                            label="Height"
                            value={
                              outputHeight
                            }
                            min={1}
                            max={
                              MAX_OUTPUT_DIMENSION
                            }
                            onChange={
                              changeOutputHeight
                            }
                            suffix="px"
                          />
                        </div>

                        <label className="mt-5 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
                          <input
                            type="checkbox"
                            checked={
                              lockAspectRatio
                            }
                            onChange={(event) =>
                              setLockAspectRatio(
                                event.target
                                  .checked
                              )
                            }
                            className="h-4 w-4 accent-blue-600"
                          />
                          Lock aspect ratio
                        </label>

                        <button
                          type="button"
                          onClick={
                            resetAdjustments
                          }
                          className="mt-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          ↶ Reset Adjustments
                        </button>
                      </div>
                    </div>
                  </section>

                  <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                        4
                      </span>

                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Output Settings
                        </h2>

                        <p className="text-sm text-gray-600">
                          Choose the image format and quality.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="output-format"
                          className="block text-sm font-bold text-gray-700"
                        >
                          Format
                        </label>

                        <select
                          id="output-format"
                          value={
                            outputFormat
                          }
                          onChange={(event) =>
                            setOutputFormat(
                              event.target
                                .value
                            )
                          }
                          className="mt-2 h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="image/png">
                            PNG
                          </option>
                          <option value="image/jpeg">
                            JPEG
                          </option>
                          <option value="image/webp">
                            WebP
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="quality"
                          className="block text-sm font-bold text-gray-700"
                        >
                          Quality:{" "}
                          {Math.round(
                            quality * 100
                          )}
                          %
                        </label>

                        <input
                          id="quality"
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.05"
                          value={quality}
                          disabled={
                            outputFormat ===
                            "image/png"
                          }
                          onChange={(event) =>
                            setQuality(
                              Number(
                                event.target
                                  .value
                              )
                            )
                          }
                          className="mt-5 w-full accent-blue-600 disabled:opacity-40"
                        />

                        <p className="mt-2 text-xs text-gray-500">
                          Quality affects JPEG and WebP
                          output. PNG uses lossless encoding.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                        5
                      </span>

                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Download
                        </h2>

                        <p className="text-sm text-gray-600">
                          Create and download the final image.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={
                        downloadFinalImage
                      }
                      className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      ⬇ Crop & Download
                    </button>
                  </section>
                </>
              )}
          </>
        )}

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            How to use Image Cropper
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-5">
            <InfoStep
              number="1"
              title="Upload"
              text="Select an image from your device."
            />

            <InfoStep
              number="2"
              title="Select area"
              text="Drag the crop box or enter exact pixel values."
            />

            <InfoStep
              number="3"
              title="Crop"
              text="Apply the selected crop to create a working image."
            />

            <InfoStep
              number="4"
              title="Adjust"
              text="Change size, brightness, contrast, saturation, rotation, zoom, or flip."
            />

            <InfoStep
              number="5"
              title="Download"
              text="Choose PNG, JPEG, or WebP and download the result."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Image Cropper Features
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="Interactive cropping"
              text="Draw, move, and resize the crop area directly on the image."
            />

            <Feature
              title="Precise pixel controls"
              text="Enter exact X, Y, width, and height values."
            />

            <Feature
              title="Image adjustments"
              text="Fine-tune brightness, contrast, saturation, zoom, rotation, and flipping."
            />

            <Feature
              title="Multiple formats"
              text="Download the final image as PNG, JPEG, or WebP."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            PNG, JPEG, or WebP?
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Feature
              title="PNG"
              text="Useful when you want lossless output or need to preserve transparency."
            />

            <Feature
              title="JPEG"
              text="Often useful for photographs and smaller file sizes when transparency is not required."
            />

            <Feature
              title="WebP"
              text="A modern format that can provide efficient image compression with good visual quality."
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Browser-based image processing
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            This tool performs the main image cropping and
            adjustment work in your browser using browser
            image and canvas capabilities. The selected image
            does not need to be uploaded to a ToolNoveHub
            image-processing server for these operations.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            Your browser, extensions, network configuration,
            and other software can affect how local files are
            handled. For site-wide information about data,
            analytics, and privacy, review the ToolNoveHub
            Privacy Policy.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Image Cropper FAQ
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-bold text-gray-900">
                Can I crop an image to an exact size?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. Precise Crop mode lets you enter
                the crop X and Y coordinates together
                with the exact width and height in pixels.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Can I use an aspect ratio?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. Presets include 1:1, 4:3, 3:2,
                16:9, and 9:16.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Can I rotate and flip the image?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. You can rotate the image from -180°
                to 180° and flip it horizontally or
                vertically.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Does zoom affect the downloaded image?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. The selected zoom level is applied
                when the final image is rendered for download.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Which output formats are available?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                You can download the final image as PNG,
                JPEG, or WebP.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Browser-based processing
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Cropping and image adjustments are performed
            in your browser rather than requiring the image
            to be uploaded to a ToolNoveHub processing server.
          </p>
        </section>
      </main>
    </div>
  );
}

function ResizeHandle({
  direction,
  position,
  onPointerDown,
}: {
  direction: ResizeDirection;
  position: string;
  onPointerDown: (
    event: ReactPointerEvent<HTMLDivElement>,
    direction: ResizeDirection
  ) => void;
}) {
  const cursorMap: Record<
    ResizeDirection,
    string
  > = {
    n: "cursor-ns-resize",
    s: "cursor-ns-resize",
    e: "cursor-ew-resize",
    w: "cursor-ew-resize",
    ne: "cursor-nesw-resize",
    sw: "cursor-nesw-resize",
    nw: "cursor-nwse-resize",
    se: "cursor-nwse-resize",
  };

  return (
    <div
      role="presentation"
      className={`absolute z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm border-2 border-blue-600 bg-white ${position} ${cursorMap[direction]}`}
      onPointerDown={(event) =>
        onPointerDown(
          event,
          direction
        )
      }
    />
  );
}

function NumberField({
  id,
  label,
  value,
  min = 0,
  max,
  onChange,
  suffix,
}: {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold text-gray-600"
      >
        {label}
      </label>

      <div className="flex">
        <input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          step="1"
          inputMode="numeric"
          onChange={(event) =>
            onChange(
              Number.isFinite(
                Number(event.target.value)
              )
                ? Number(
                    event.target.value
                  )
                : min
            )
          }
          className="h-11 min-w-0 flex-1 rounded-l-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {suffix && (
          <span className="flex h-11 items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-3 text-xs text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function AdjustmentSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  onReset,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
  onReset: () => void;
}) {
  const id =
    `adjustment-${label.toLowerCase()}`;

  return (
    <div className="border-b border-gray-100 py-4 last:border-0">
      <div className="flex items-center gap-3">
        <label
          htmlFor={id}
          className="w-24 shrink-0 text-sm font-semibold text-gray-700"
        >
          {label}
        </label>

        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) =>
            onChange(
              Number(event.target.value)
            )
          }
          className="w-full accent-blue-600 focus:outline-none"
        />

        <output
          htmlFor={id}
          className="w-14 text-right text-xs font-bold text-gray-700"
        >
          {display}
        </output>

        <button
          type="button"
          onClick={onReset}
          className="rounded p-1 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title={`Reset ${label}`}
          aria-label={`Reset ${label}`}
        >
          ↶
        </button>
      </div>
    </div>
  );
}

function InfoStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {number}
        </span>

        <h3 className="font-bold text-gray-900">
          {title}
        </h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}

function Feature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <h3 className="font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}