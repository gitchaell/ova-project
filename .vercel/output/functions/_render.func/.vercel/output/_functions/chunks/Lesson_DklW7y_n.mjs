import { i as isLessonTitleValid, f as LessonTitleNotValidError, g as isLessonCaptionValid, h as LessonCaptionNotValidError, j as isLessonContentValid, k as LessonContentNotValidError } from './LessonContent_BHymJ9VX.mjs';
import { i as isLessonDateValid, L as LessonDateNotValidError } from './LessonDate_CMDfJMRJ.mjs';
import { i as isCourseIdValid, C as CourseIdNotValidError } from './CourseId_932Qp4L3.mjs';

function isLessonIdValid(id) {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(id);
}
function LessonIdNotValidError(id) {
  return new Error(`Lesson ID ${id} is not valid`);
}

class Lesson {
  id;
  title;
  caption;
  start;
  end;
  done;
  content;
  image;
  videoId;
  video;
  courseId;
  static createLesson({
    id,
    title,
    caption,
    start,
    end,
    content,
    courseId
  }) {
    const lesson = new Lesson();
    lesson.id = id;
    lesson.title = title || "";
    lesson.caption = caption || "";
    lesson.start = start;
    lesson.end = end;
    lesson.done = false;
    lesson.content = content || "";
    lesson.image = "";
    lesson.videoId = "";
    lesson.video = "";
    lesson.courseId = courseId;
    return lesson;
  }
  constructor() {
  }
}
function ensureLessonIsValid({
  id,
  title,
  caption,
  start,
  end,
  content,
  courseId
}) {
  if (!isLessonIdValid(id)) {
    throw LessonIdNotValidError(id);
  }
  if (!isLessonTitleValid(title)) {
    throw LessonTitleNotValidError(title);
  }
  if (!isLessonCaptionValid(caption)) {
    throw LessonCaptionNotValidError(caption);
  }
  if (!isLessonDateValid(start)) {
    throw LessonDateNotValidError(start);
  }
  if (!isLessonDateValid(end)) {
    throw LessonDateNotValidError(end);
  }
  if (content && !isLessonContentValid(content)) {
    throw LessonContentNotValidError(content);
  }
  if (!isCourseIdValid(courseId)) {
    throw CourseIdNotValidError(courseId);
  }
}

export { Lesson as L, ensureLessonIsValid as e };
