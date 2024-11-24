const COURSE_CONCEPTS_MIN_LENGTH = 5;
const COURSE_CONCEPTS_MAX_LENGTH = 700;
function isCourseConceptsValid(concepts) {
  return concepts.length >= COURSE_CONCEPTS_MIN_LENGTH && concepts.length <= COURSE_CONCEPTS_MAX_LENGTH;
}
function CourseConceptsNotValidError(concepts) {
  return new Error(
    `Concepts ${concepts} must be between ${COURSE_CONCEPTS_MIN_LENGTH} and ${COURSE_CONCEPTS_MAX_LENGTH} characters`
  );
}

const COURSE_LEVEL_MIN_LENGTH = 5;
const COURSE_LEVEL_MAX_LENGTH = 700;
function isCourseLevelValid(level) {
  return level.length >= COURSE_LEVEL_MIN_LENGTH && level.length <= COURSE_LEVEL_MAX_LENGTH;
}
function CourseLevelNotValidError(level) {
  return new Error(
    `Level ${level} must be between ${COURSE_LEVEL_MIN_LENGTH} and ${COURSE_LEVEL_MAX_LENGTH} characters`
  );
}

const COURSE_TITLE_MIN_LENGTH = 5;
const COURSE_TITLE_MAX_LENGTH = 400;
function isCourseTitleValid(title) {
  return title.length >= COURSE_TITLE_MIN_LENGTH && title.length <= COURSE_TITLE_MAX_LENGTH;
}
function CourseTitleNotValidError(title) {
  return new Error(
    `Title ${title} must be between ${COURSE_TITLE_MIN_LENGTH} and ${COURSE_TITLE_MAX_LENGTH} characters`
  );
}

const COURSE_SCHEDULES_MAX_LENGTH = 700;
function isCourseScheduleValid(schedule) {
  if (!schedule) {
    return false;
  }
  if (schedule.length > COURSE_SCHEDULES_MAX_LENGTH) {
    return false;
  }
  return true;
}
function CourseScheduleNotValidError(schedule) {
  return new Error(
    `Course schedule ${schedule} is required and must be less than ${COURSE_SCHEDULES_MAX_LENGTH} characters`
  );
}
const COURSE_SCHEDULE_DEFAULT = "De lunes a viernes, 3 horas cada día";

export { COURSE_TITLE_MIN_LENGTH as C, COURSE_TITLE_MAX_LENGTH as a, COURSE_CONCEPTS_MIN_LENGTH as b, COURSE_CONCEPTS_MAX_LENGTH as c, COURSE_LEVEL_MIN_LENGTH as d, COURSE_LEVEL_MAX_LENGTH as e, COURSE_SCHEDULES_MAX_LENGTH as f, COURSE_SCHEDULE_DEFAULT as g, CourseTitleNotValidError as h, isCourseTitleValid as i, isCourseConceptsValid as j, CourseConceptsNotValidError as k, isCourseLevelValid as l, CourseLevelNotValidError as m, isCourseScheduleValid as n, CourseScheduleNotValidError as o };
