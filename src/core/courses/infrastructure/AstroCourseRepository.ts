import {
	Course as CourseTable,
	Lesson as LessonTable,
	and,
	db,
	eq,
	like,
} from 'astro:db'
import { type Course } from '@/core/courses/domain/Course.ts'
import { type CourseRepository } from '@/core/courses/domain/CourseRepository.ts'
import { CourseNotFoundException } from '@/core/courses/domain/CourseNotFoundException'
import { CourseAlreadyExistsException } from '../domain/CourseAlreadyExistsException'

export function createAstroCourseRepository(): CourseRepository {
	return {
		save,
		find,
		search,
		remove,
	}
}

async function save(course: Course): Promise<void> {
	const matchingId = await search({ id: course.id })

	if (matchingId?.length > 0) {
		await db
			.update(CourseTable)
			.set({
				title: course.title,
				concepts: course.concepts,
				level: course.level,
				start: new Date(course.start),
				end: new Date(course.end),
				schedules: course.schedules,
			})
			.where(eq(CourseTable.id, course.id))
			.execute()
	} else {
		const matchingTitle = await search({
			title: course.title,
		})

		if (matchingTitle?.length > 0) {
			throw new CourseAlreadyExistsException()
		}

		await db
			.insert(CourseTable)
			.values({
				id: course.id,
				title: course.title,
				concepts: course.concepts,
				level: course.level,
				start: new Date(course.start),
				end: new Date(course.end),
				schedules: course.schedules,
				userId: course.userId,
			})
			.execute()
	}
}

async function find({ id, title }: Partial<Course>): Promise<Course> {
	let courses: Course[] = []

	const query = db.select().from(CourseTable)

	if (id) {
		courses = await query.where(eq(CourseTable.id, id)).execute()
	}
	if (title) {
		courses = await query.where(eq(CourseTable.title, title)).execute()
	}

	const course = courses?.[0] || null

	if (!course) {
		throw new CourseNotFoundException()
	}

	return course
}

async function search({
	id,
	title,
	userId,
}: Partial<Course>): Promise<Course[]> {
	const query = db.select().from(CourseTable)

	if (id) {
		return await query.where(eq(CourseTable.id, id)).execute()
	}
	if (title && userId) {
		return await query
			.where(
				and(
					like(CourseTable.title, `%${title}%`),
					eq(CourseTable.userId, userId),
				),
			)
			.execute()
	}
	if (title) {
		return await query.where(like(CourseTable.title, `%${title}%`)).execute()
	}
	if (userId) {
		return await query.where(eq(CourseTable.userId, userId)).execute()
	}

	return []
}

async function remove(id: string): Promise<void> {
	await db.delete(LessonTable).where(eq(LessonTable.courseId, id)).execute()
	await db.delete(CourseTable).where(eq(CourseTable.id, id)).execute()
}
