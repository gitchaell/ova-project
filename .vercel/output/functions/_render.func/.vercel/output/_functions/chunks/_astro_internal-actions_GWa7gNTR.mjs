import './_astro_actions_BP7j5CaX.mjs';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import { c as courseService } from './CourseService_BKaDX8jH.mjs';
import { A as AstroError, h as ActionCalledFromServerError } from './astro/assets-service_DMZndIT3.mjs';
import { i as isActionAPIContext } from './utils_Cwo9_uli.mjs';
import { c as callSafely, b as ActionError, d as ActionInputError } from './shared_C0Tkk68m.mjs';
import { l as lessonService } from './LessonService_Bd77hKO8.mjs';
import { u as userService } from './UserService_BDUu-52_.mjs';

function defineAction({
  accept,
  input: inputSchema,
  handler
}) {
  const serverHandler = accept === "form" ? getFormServerHandler(handler, inputSchema) : getJsonServerHandler(handler, inputSchema);
  async function safeServerHandler(unparsedInput) {
    if (typeof this === "function" || !isActionAPIContext(this)) {
      throw new AstroError(ActionCalledFromServerError);
    }
    return callSafely(() => serverHandler(unparsedInput, this));
  }
  Object.assign(safeServerHandler, {
    orThrow(unparsedInput) {
      if (typeof this === "function") {
        throw new AstroError(ActionCalledFromServerError);
      }
      return serverHandler(unparsedInput, this);
    }
  });
  return safeServerHandler;
}
function getFormServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (!(unparsedInput instanceof FormData)) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts FormData."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const baseSchema = unwrapBaseObjectSchema(inputSchema, unparsedInput);
    const parsed = await inputSchema.safeParseAsync(
      baseSchema instanceof z$1.ZodObject ? formDataToObject(unparsedInput, baseSchema) : unparsedInput
    );
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function getJsonServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (unparsedInput instanceof FormData) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts JSON."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(unparsedInput);
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function formDataToObject(formData, schema) {
  const obj = schema._def.unknownKeys === "passthrough" ? Object.fromEntries(formData.entries()) : {};
  for (const [key, baseValidator] of Object.entries(schema.shape)) {
    let validator = baseValidator;
    while (validator instanceof z$1.ZodOptional || validator instanceof z$1.ZodNullable || validator instanceof z$1.ZodDefault) {
      if (validator instanceof z$1.ZodDefault && !formData.has(key)) {
        obj[key] = validator._def.defaultValue();
      }
      validator = validator._def.innerType;
    }
    if (!formData.has(key) && key in obj) {
      continue;
    } else if (validator instanceof z$1.ZodBoolean) {
      const val = formData.get(key);
      obj[key] = val === "true" ? true : val === "false" ? false : formData.has(key);
    } else if (validator instanceof z$1.ZodArray) {
      obj[key] = handleFormDataGetAll(key, formData, validator);
    } else {
      obj[key] = handleFormDataGet(key, formData, validator, baseValidator);
    }
  }
  return obj;
}
function handleFormDataGetAll(key, formData, validator) {
  const entries = Array.from(formData.getAll(key));
  const elementValidator = validator._def.type;
  if (elementValidator instanceof z$1.ZodNumber) {
    return entries.map(Number);
  } else if (elementValidator instanceof z$1.ZodBoolean) {
    return entries.map(Boolean);
  }
  return entries;
}
function handleFormDataGet(key, formData, validator, baseValidator) {
  const value = formData.get(key);
  if (!value) {
    return baseValidator instanceof z$1.ZodOptional ? void 0 : null;
  }
  return validator instanceof z$1.ZodNumber ? Number(value) : value;
}
function unwrapBaseObjectSchema(schema, unparsedInput) {
  while (schema instanceof z$1.ZodEffects || schema instanceof z$1.ZodPipeline) {
    if (schema instanceof z$1.ZodEffects) {
      schema = schema._def.schema;
    }
    if (schema instanceof z$1.ZodPipeline) {
      schema = schema._def.in;
    }
  }
  if (schema instanceof z$1.ZodDiscriminatedUnion) {
    const typeKey = schema._def.discriminator;
    const typeValue = unparsedInput.get(typeKey);
    if (typeof typeValue !== "string") return schema;
    const objSchema = schema._def.optionsMap.get(typeValue);
    if (!objSchema) return schema;
    return objSchema;
  }
  return schema;
}

const course = {
  find: defineAction({
    input: z.object({
      id: z.string().uuid()
    }),
    handler: async ({ id }) => {
      let course2;
      try {
        course2 = await courseService.findCourse({ id });
      } catch (error) {
        if (error instanceof Error) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
            stack: error.stack
          });
        }
      }
      return course2;
    }
  }),
  search: defineAction({
    input: z.object({
      title: z.string().optional(),
      userId: z.string().uuid()
    }),
    handler: async ({ title, userId }) => {
      let courses = [];
      try {
        courses = await courseService.searchCourses({ title, userId });
      } catch (error) {
        if (error instanceof Error) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
            stack: error.stack
          });
        }
      }
      return courses;
    }
  })
};

const lesson = {
  find: defineAction({
    input: z.object({
      id: z.string().uuid()
    }),
    handler: async ({ id }) => {
      let lesson2;
      try {
        lesson2 = await lessonService.findLesson({ id });
      } catch (error) {
        if (error instanceof Error) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
            stack: error.stack
          });
        }
      }
      return lesson2;
    }
  }),
  search: defineAction({
    input: z.object({
      title: z.string().optional(),
      courseId: z.string().uuid()
    }),
    handler: async ({ title, courseId }) => {
      let lessons = [];
      try {
        lessons = await lessonService.searchLessons({ title, courseId });
      } catch (error) {
        if (error instanceof Error) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
            stack: error.stack
          });
        }
      }
      return lessons;
    }
  })
};

const user = {
  find: defineAction({
    input: z.object({
      id: z.string().uuid()
    }),
    handler: async ({ id }) => {
      let user2 = null;
      try {
        user2 = await userService.findUser({ id });
      } catch (error) {
        if (error instanceof Error) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
            stack: error.stack
          });
        }
      }
      return user2;
    }
  })
};

const server = {
  user,
  course,
  lesson
};

export { server };
