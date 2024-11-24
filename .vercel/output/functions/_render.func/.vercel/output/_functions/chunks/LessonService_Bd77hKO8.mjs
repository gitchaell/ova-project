import { d as db, L as Lesson } from './_astro_db_DqqSvL7D.mjs';
import { eq, and, like } from '@astrojs/db/dist/runtime/virtual.js';
import { e as ensureLessonIsValid } from './Lesson_DklW7y_n.mjs';

class LessonNotFoundException extends Error {
  constructor() {
    super(`Lección no encontrada`);
  }
}

class LessonAlreadyExistsException extends Error {
  constructor() {
    super(`Ya existe una lección registrada con este título`);
  }
}

function createAstroLessonRepository() {
  return {
    save,
    find,
    search,
    remove
  };
}
async function save(lesson) {
  const matchingId = await search({ id: lesson.id });
  if (matchingId?.length > 0) {
    await db.update(Lesson).set({
      title: lesson.title,
      caption: lesson.caption,
      start: new Date(lesson.start),
      end: new Date(lesson.end),
      done: lesson.done,
      content: lesson.content,
      image: lesson.image,
      videoId: lesson.videoId,
      video: lesson.video
    }).where(eq(Lesson.id, lesson.id)).execute();
  } else {
    const matchingTitle = await search({
      title: lesson.title,
      courseId: lesson.courseId
    });
    if (matchingTitle?.length > 0) {
      throw new LessonAlreadyExistsException();
    }
    await db.insert(Lesson).values({
      id: lesson.id,
      title: lesson.title,
      caption: lesson.caption,
      start: new Date(lesson.start),
      end: new Date(lesson.end),
      done: lesson.done,
      content: lesson.content,
      image: lesson.image,
      videoId: lesson.videoId,
      video: lesson.video,
      courseId: lesson.courseId
    }).execute();
  }
}
async function find({ id, title }) {
  let lessons = [];
  const query = db.select().from(Lesson);
  if (id) {
    lessons = await query.where(eq(Lesson.id, id)).execute();
  }
  if (title) {
    lessons = await query.where(eq(Lesson.title, title)).execute();
  }
  const lesson = lessons?.[0] || null;
  if (!lesson) {
    throw new LessonNotFoundException();
  }
  return lesson;
}
async function search({
  id,
  title,
  courseId
}) {
  const query = db.select().from(Lesson);
  if (id) {
    return await query.where(eq(Lesson.id, id)).execute();
  }
  if (title && courseId) {
    return await query.where(
      and(
        like(Lesson.title, `%${title}%`),
        eq(Lesson.courseId, courseId)
      )
    ).execute();
  }
  if (title) {
    return await query.where(like(Lesson.title, `%${title}%`)).execute();
  }
  if (courseId) {
    return await query.where(eq(Lesson.courseId, courseId)).execute();
  }
  return [];
}
async function remove(id) {
  await db.delete(Lesson).where(eq(Lesson.id, id)).execute();
}

async function findLesson(lessonRepository, criteria) {
  return await lessonRepository.find(criteria);
}

async function saveLesson(lessonRepository, lesson) {
  ensureLessonIsValid(lesson);
  await lessonRepository.save(lesson);
}

async function removeLesson(lessonRepository, lessonId) {
  return await lessonRepository.remove(lessonId);
}

async function searchLessons(lessonRepository, criteria) {
  return await lessonRepository.search(criteria);
}

class LessonService {
  repository;
  constructor() {
    this.repository = createAstroLessonRepository();
  }
  async saveLesson(lesson) {
    await saveLesson(this.repository, lesson);
  }
  async searchLessons({
    title,
    courseId
  }) {
    return await searchLessons(this.repository, { title, courseId });
  }
  async findLesson({ id, title }) {
    return await findLesson(this.repository, { id, title });
  }
  async removeLesson(lessonId) {
    await removeLesson(this.repository, lessonId);
  }
}
const lessonService = new LessonService();

export { lessonService as l };
