import * as dotenv from 'dotenv';
import { l as lessonService } from '../../../../chunks/LessonService_Bd77hKO8.mjs';
import { S as StorageService } from '../../../../chunks/StorageService_B90JeVMn.mjs';
export { renderers } from '../../../../renderers.mjs';

class TranslateService {
  static async translate(text, sourceLang = "auto", targetLang = "en") {
    const escapedStr = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${escapedStr}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const result = data?.[0]?.[0]?.[0] || text;
      return result;
    } catch (error) {
      console.error("Error al traducir el texto:", error);
      throw new Error("No se pudo traducir el texto");
    }
  }
}

dotenv.config();
var ImageProvider = /* @__PURE__ */ ((ImageProvider2) => {
  ImageProvider2["Stability"] = "Stability";
  ImageProvider2["Nexra"] = "Nexra";
  ImageProvider2["DeepInfra"] = "DeepInfra";
  ImageProvider2["Rocks"] = "Rocks";
  return ImageProvider2;
})(ImageProvider || {});
class ImageService {
  static async generate(prompt, provider = "Nexra" /* Nexra */, options) {
    switch (provider) {
      case "Stability" /* Stability */:
        return Stability.generate(prompt, options);
      case "Nexra" /* Nexra */:
        return Nexra.generate(prompt, options);
      case "DeepInfra" /* DeepInfra */:
        return DeepInfra.generate(prompt, options);
      case "Rocks" /* Rocks */:
        return Rocks.generate(prompt, options);
      default:
        throw new Error("Image Provider not found.");
    }
  }
}
class Stability {
  static async generate(inprompt, options) {
    const prompt = await TranslateService.translate(inprompt);
    const formData = new FormData();
    formData.append("prompt", prompt);
    for (const key in options) {
      formData.append(key, options[key]);
    }
    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/ultra",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "image/*"
        },
        body: formData
      }
    );
    if (response.ok) {
      const type = `image/${options.output_format}`;
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type });
      const file = new File([blob], `image.${options.output_format}`, { type });
      return file;
    } else {
      throw new Error(`${response.status}: ${await response.text()}`);
    }
  }
}
class Nexra {
  static async generate(prompt, options) {
    const baseResponse = await fetch(
      "https://nexra.aryahcr.cc/api/image/complements",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model: options.model,
          data: options.data
        })
      }
    );
    if (!baseResponse.ok) {
      throw new Error(
        `status: ${baseResponse.status}, error: ${await baseResponse.text()}`
      );
    }
    const baseResult = await baseResponse.json();
    let result = null;
    let loading = true;
    while (loading) {
      const response = await fetch(
        "http://nexra.aryahcr.cc/api/image/complements/" + encodeURIComponent(baseResult.id),
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      result = await response.json();
      switch (result.status) {
        case "pending":
          loading = true;
          break;
        case "error":
        case "completed":
        case "not_found":
          loading = false;
          break;
      }
    }
    if (!result?.images?.[0]?.length)
      throw new Error("No valid image found in response.");
    return result.images[0];
  }
}
class DeepInfra {
  static async generate(prompt, options) {
    const response = await fetch(
      `https://api.deepinfra.com/v1/inference/${options.model}`,
      {
        method: "POST",
        headers: {
          "Accept": "text/event-stream",
          "Content-Type": "application/json",
          "User-Agent": "Custom-Agent"
        },
        body: JSON.stringify({ prompt, ...options.data })
      }
    );
    if (!response.ok) {
      throw new Error(
        `status: ${response.status}, error: ${await response.text()}`
      );
    }
    const result = await response.json();
    return result.images[0].split(";base64,").pop();
  }
}
class Rocks {
  static async generate(prompt, options) {
    const params = new URLSearchParams({ prompt, model: options.model });
    const response = await fetch(
      `https://api.airforce/imagine?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "User-Agent": "Custom-Agent"
        }
      }
    );
    if (!response.ok) {
      throw new Error(
        `status: ${response.status}, error: ${await response.text()}`
      );
    }
    const binaryImage = await response.arrayBuffer();
    const arrayBufferToBase64 = (buffer) => {
      const bytes = new Uint8Array(buffer);
      const binary = String.fromCharCode(...bytes);
      return typeof window !== "undefined" ? window.btoa(binary) : Buffer.from(binary, "binary").toString("base64");
    };
    return arrayBufferToBase64(binaryImage);
  }
}

dotenv.config();
const POST = async (context) => {
  try {
    const { lesson, imagePrompt } = await context.request.json();
    const file = await ImageService.generate(
      imagePrompt,
      ImageProvider.Stability,
      {
        aspect_ratio: "1:1",
        output_format: "png"
      }
    );
    const url = await StorageService.upload(file);
    await lessonService.saveLesson({
      ...lesson,
      id: lesson.id,
      image: url
    });
    return new Response(JSON.stringify({ message: "success" }), { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500
      });
    }
  }
  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
