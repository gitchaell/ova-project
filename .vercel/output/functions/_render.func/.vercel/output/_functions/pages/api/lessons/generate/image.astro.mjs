import * as dotenv from 'dotenv';
import { l as lessonService } from '../../../../chunks/LessonService_Bd77hKO8.mjs';
import fetch from 'node-fetch';
import { S as StorageService } from '../../../../chunks/StorageService_B90JeVMn.mjs';
export { renderers } from '../../../../renderers.mjs';

class TranslateService {
  static async translate(text, sourceLang = "auto", targetLang = "en") {
    try {
      const escapedStr = encodeURIComponent(text);
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${escapedStr}`;
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
  return ImageProvider2;
})(ImageProvider || {});
class ImageService {
  static async generate(prompt, provider = "Stability" /* Stability */, options) {
    switch (provider) {
      case "Stability" /* Stability */:
        return Stability.generate(prompt, options);
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
