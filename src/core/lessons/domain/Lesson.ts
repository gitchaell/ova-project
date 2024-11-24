import { LessonIdNotValidError, isLessonIdValid } from './LessonId'
import { LessonTitleNotValidError, isLessonTitleValid } from './LessonTitle'
import {
	LessonCaptionNotValidError,
	isLessonCaptionValid,
} from './LessonCaption'
import { LessonDateNotValidError, isLessonDateValid } from './LessonDate'
import {
	LessonContentNotValidError,
	isLessonContentValid,
} from './LessonContent'
import {
	CourseIdNotValidError,
	isCourseIdValid,
} from '@/core/courses/domain/CourseId'

export class Lesson {
	id!: string
	title!: string
	caption!: string
	start!: Date
	end!: Date
	done!: boolean
	content?: string | null | undefined
	image?: string | null | undefined
	videoId?: string | null | undefined
	video?: string | null | undefined
	courseId!: string

	static createLesson({
		id,
		title,
		caption,
		start,
		end,
		content,
		courseId,
	}: Partial<Lesson> & { id: string; courseId: string }) {
		const lesson = new Lesson()
		lesson.id = id
		lesson.title = title || ''
		lesson.caption = caption || ''
		lesson.start = start!
		lesson.end = end!
		lesson.done = false
		lesson.content = content || ''
		lesson.image = ''
		lesson.videoId = ''
		lesson.video = ''
		lesson.courseId = courseId
		return lesson
	}

	constructor() {}
}

export function ensureLessonIsValid({
	id,
	title,
	caption,
	start,
	end,
	content,
	courseId,
}: Lesson): void {
	if (!isLessonIdValid(id)) {
		throw LessonIdNotValidError(id)
	}
	if (!isLessonTitleValid(title)) {
		throw LessonTitleNotValidError(title)
	}
	if (!isLessonCaptionValid(caption)) {
		throw LessonCaptionNotValidError(caption)
	}
	if (!isLessonDateValid(start)) {
		throw LessonDateNotValidError(start)
	}
	if (!isLessonDateValid(end)) {
		throw LessonDateNotValidError(end)
	}
	if (content && !isLessonContentValid(content)) {
		throw LessonContentNotValidError(content)
	}
	if (!isCourseIdValid(courseId)) {
		throw CourseIdNotValidError(courseId)
	}
}
