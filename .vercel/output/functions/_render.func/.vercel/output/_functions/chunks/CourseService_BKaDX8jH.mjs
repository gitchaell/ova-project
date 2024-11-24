import { d as db, C as Course, L as Lesson } from './_astro_db_DqqSvL7D.mjs';
import { eq, and, like } from '@astrojs/db/dist/runtime/virtual.js';
import { e as ensureCourseIsValid } from './Course_D1xd8dtT.mjs';

class CourseNotFoundException extends Error {
  constructor() {
    super(`Curso no encontrado`);
  }
}

class CourseAlreadyExistsException extends Error {
  constructor() {
    super(`Ya existe un curso registrado con este título`);
  }
}

function createAstroCourseRepository() {
  return {
    save,
    find,
    search,
    remove
  };
}
async function save(course) {
  const matchingId = await search({ id: course.id });
  if (matchingId?.length > 0) {
    await db.update(Course).set({
      title: course.title,
      concepts: course.concepts,
      level: course.level,
      start: new Date(course.start),
      end: new Date(course.end),
      schedules: course.schedules
    }).where(eq(Course.id, course.id)).execute();
  } else {
    const matchingTitle = await search({
      title: course.title
    });
    if (matchingTitle?.length > 0) {
      throw new CourseAlreadyExistsException();
    }
    await db.insert(Course).values({
      id: course.id,
      title: course.title,
      concepts: course.concepts,
      level: course.level,
      start: new Date(course.start),
      end: new Date(course.end),
      schedules: course.schedules,
      userId: course.userId
    }).execute();
  }
}
async function find({ id, title }) {
  let courses = [];
  const query = db.select().from(Course);
  if (id) {
    courses = await query.where(eq(Course.id, id)).execute();
  }
  if (title) {
    courses = await query.where(eq(Course.title, title)).execute();
  }
  const course = courses?.[0] || null;
  if (!course) {
    throw new CourseNotFoundException();
  }
  return course;
}
async function search({
  id,
  title,
  userId
}) {
  const query = db.select().from(Course);
  if (id) {
    return await query.where(eq(Course.id, id)).execute();
  }
  if (title && userId) {
    return await query.where(
      and(
        like(Course.title, `%${title}%`),
        eq(Course.userId, userId)
      )
    ).execute();
  }
  if (title) {
    return await query.where(like(Course.title, `%${title}%`)).execute();
  }
  if (userId) {
    return await query.where(eq(Course.userId, userId)).execute();
  }
  return [];
}
async function remove(id) {
  await db.delete(Lesson).where(eq(Lesson.courseId, id)).execute();
  await db.delete(Course).where(eq(Course.id, id)).execute();
}

async function findCourse(courseRepository, criteria) {
  return await courseRepository.find(criteria);
}

async function saveCourse(courseRepository, course) {
  ensureCourseIsValid(course);
  await courseRepository.save(course);
}

async function removeCourse(courseRepository, courseId) {
  return await courseRepository.remove(courseId);
}

async function searchCourses(courseRepository, criteria) {
  return await courseRepository.search(criteria);
}

class CourseService {
  repository;
  constructor() {
    this.repository = createAstroCourseRepository();
  }
  async saveCourse(course) {
    await saveCourse(this.repository, course);
  }
  async searchCourses({ title, userId }) {
    return await searchCourses(this.repository, { title, userId });
  }
  async findCourse({ id, title }) {
    return await findCourse(this.repository, { id, title });
  }
  async removeCourse(courseId) {
    await removeCourse(this.repository, courseId);
  }
}
const courseService = new CourseService();

export { courseService as c };
