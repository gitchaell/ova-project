import { i as isUserIdValid, U as UserIdNotValidError } from './UserId_DRQ5u2Ki.mjs';
import { g as COURSE_SCHEDULE_DEFAULT, i as isCourseTitleValid, h as CourseTitleNotValidError, j as isCourseConceptsValid, k as CourseConceptsNotValidError, l as isCourseLevelValid, m as CourseLevelNotValidError, n as isCourseScheduleValid, o as CourseScheduleNotValidError } from './CourseSchedule_CFnDbjrM.mjs';
import { i as isCourseDateValid, C as CourseDateNotValidError } from './CourseDate_De5miepE.mjs';
import { i as isCourseIdValid, C as CourseIdNotValidError } from './CourseId_932Qp4L3.mjs';

class Course {
  id;
  title;
  level;
  concepts;
  start;
  end;
  schedules;
  userId;
  static createCourse({
    id,
    title,
    level,
    concepts,
    start,
    end,
    userId
  }) {
    const course = new Course();
    course.id = id;
    course.title = title || "";
    course.concepts = concepts || "";
    course.level = level || "";
    course.start = start;
    course.end = end;
    course.schedules = COURSE_SCHEDULE_DEFAULT;
    course.userId = userId;
    return course;
  }
  constructor() {
  }
}
function ensureCourseIsValid({
  id,
  title,
  concepts,
  level,
  start,
  end,
  schedules,
  userId
}) {
  if (!isCourseIdValid(id)) {
    throw CourseIdNotValidError(id);
  }
  if (!isCourseTitleValid(title)) {
    throw CourseTitleNotValidError(title);
  }
  if (!isCourseConceptsValid(concepts)) {
    throw CourseConceptsNotValidError(concepts);
  }
  if (!isCourseLevelValid(level)) {
    throw CourseLevelNotValidError(level);
  }
  if (!isCourseDateValid(start)) {
    throw CourseDateNotValidError(start);
  }
  if (!isCourseDateValid(end)) {
    throw CourseDateNotValidError(end);
  }
  if (schedules && !isCourseScheduleValid(schedules)) {
    throw CourseScheduleNotValidError(schedules);
  }
  if (!isUserIdValid(userId)) {
    throw UserIdNotValidError(userId);
  }
}

export { Course as C, ensureCourseIsValid as e };
