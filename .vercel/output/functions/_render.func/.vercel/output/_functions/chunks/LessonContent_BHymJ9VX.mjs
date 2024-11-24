const LESSON_TITLE_MIN_LENGTH = 5;
const LESSON_TITLE_MAX_LENGTH = 700;
function isLessonTitleValid(title) {
  return title.length >= LESSON_TITLE_MIN_LENGTH && title.length <= LESSON_TITLE_MAX_LENGTH;
}
function LessonTitleNotValidError(title) {
  return new Error(
    `Title ${title} must be between ${LESSON_TITLE_MIN_LENGTH} and ${LESSON_TITLE_MAX_LENGTH} characters`
  );
}

const LESSON_CAPTION_MIN_LENGTH = 5;
const LESSON_CAPTION_MAX_LENGTH = 700;
function isLessonCaptionValid(caption) {
  return caption.length >= LESSON_CAPTION_MIN_LENGTH && caption.length <= LESSON_CAPTION_MAX_LENGTH;
}
function LessonCaptionNotValidError(caption) {
  return new Error(
    `Caption ${caption} must be between ${LESSON_CAPTION_MIN_LENGTH} and ${LESSON_CAPTION_MAX_LENGTH} characters`
  );
}

const LESSON_CONTENT_MIN_LENGTH = 3e3;
const LESSON_CONTENT_MAX_LENGTH = 5e4;
function isLessonContentValid(content) {
  return content.length >= LESSON_CONTENT_MIN_LENGTH && content.length <= LESSON_CONTENT_MAX_LENGTH;
}
function LessonContentNotValidError(content) {
  return new Error(
    `Content ${content} must be between ${LESSON_CONTENT_MIN_LENGTH} and ${LESSON_CONTENT_MAX_LENGTH} characters`
  );
}

export { LESSON_CONTENT_MIN_LENGTH as L, LESSON_CONTENT_MAX_LENGTH as a, LESSON_TITLE_MIN_LENGTH as b, LESSON_TITLE_MAX_LENGTH as c, LESSON_CAPTION_MIN_LENGTH as d, LESSON_CAPTION_MAX_LENGTH as e, LessonTitleNotValidError as f, isLessonCaptionValid as g, LessonCaptionNotValidError as h, isLessonTitleValid as i, isLessonContentValid as j, LessonContentNotValidError as k };
