import { Lesson as LessonTable, and, db, eq, like } from 'astro:db'
import { type Lesson } from '@/core/lessons/domain/Lesson.ts'
import { type LessonRepository } from '@/core/lessons/domain/LessonRepository.ts'
import { LessonNotFoundException } from '@/core/lessons/domain/LessonNotFoundException'
import { LessonAlreadyExistsException } from '../domain/LessonAlreadyExistsException'

export function createAstroLessonRepository(): LessonRepository {
	return {
		save,
		find,
		search,
		remove,
	}
}

async function save(lesson: Lesson): Promise<void> {
	const matchingId = await search({ id: lesson.id })

	if (matchingId?.length > 0) {
		await db
			.update(LessonTable)
			.set({
				title: lesson.title,
				caption: lesson.caption,
				start: new Date(lesson.start),
				end: new Date(lesson.end),
				done: lesson.done,
				content: lesson.content,
				image: lesson.image,
				videoId: lesson.videoId,
				video: lesson.video,
			})
			.where(eq(LessonTable.id, lesson.id))
			.execute()
	} else {
		const matchingTitle = await search({
			title: lesson.title,
			courseId: lesson.courseId,
		})

		if (matchingTitle?.length > 0) {
			throw new LessonAlreadyExistsException()
		}

		await db
			.insert(LessonTable)
			.values({
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
				courseId: lesson.courseId,
			})
			.execute()
	}
}

async function find({ id, title }: Partial<Lesson>): Promise<Lesson> {
	let lessons: Lesson[] = []

	const query = db.select().from(LessonTable)

	if (id) {
		lessons = await query.where(eq(LessonTable.id, id)).execute()
	}
	if (title) {
		lessons = await query.where(eq(LessonTable.title, title)).execute()
	}

	const lesson = lessons?.[0] || null

	if (!lesson) {
		throw new LessonNotFoundException()
	}

	return lesson
}

async function search({
	id,
	title,
	courseId,
}: Partial<Lesson>): Promise<Lesson[]> {
	const query = db.select().from(LessonTable)

	if (id) {
		return await query.where(eq(LessonTable.id, id)).execute()
	}
	if (title && courseId) {
		return await query
			.where(
				and(
					like(LessonTable.title, `%${title}%`),
					eq(LessonTable.courseId, courseId),
				),
			)
			.execute()
	}
	if (title) {
		return await query.where(like(LessonTable.title, `%${title}%`)).execute()
	}
	if (courseId) {
		return await query.where(eq(LessonTable.courseId, courseId)).execute()
	}

	return []
}

async function remove(id: string): Promise<void> {
	await db.delete(LessonTable).where(eq(LessonTable.id, id)).execute()
}
