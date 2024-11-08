import * as dotenv from 'dotenv'
import type { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'

dotenv.config()

export class SerperService {
	static async search(
		courseTitle: string,
		lessonTitle: string,
	): Promise<{
		images: Pick<SerperImage, 'title' | 'link' | 'imageUrl' | 'thumbnailUrl'>[]
		videos: Pick<SerperVideo, 'title' | 'link' | 'imageUrl' | 'channel'>[]
	}> {
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'X-API-KEY': process.env.SERPER_API_KEY!,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				q: `${courseTitle} - ${lessonTitle}`,
				hl: 'es',
			}),
		}

		const [imagesResponse, videosResponse] = await Promise.all([
			fetch('https://google.serper.dev/images', options),
			fetch('https://google.serper.dev/videos', options),
		])

		if (!imagesResponse.ok) {
			throw new Error(
				`status: ${imagesResponse.status}, error: ${await imagesResponse.text()}`,
			)
		}

		if (!videosResponse.ok) {
			throw new Error(
				`status: ${videosResponse.status}, error: ${await videosResponse.text()}`,
			)
		}

		const [imagesData, videosData] = await Promise.all([
			imagesResponse.json() as Promise<SerperImagesResponse>,
			videosResponse.json() as Promise<SerperVideosResponse>,
		])

		return {
			images: imagesData.images.map(
				({ title, link, imageUrl, thumbnailUrl }) => ({
					title,
					link,
					imageUrl,
					thumbnailUrl,
				}),
			),
			videos: videosData.videos.map(({ title, link, imageUrl, channel }) => ({
				title,
				link,
				imageUrl,
				channel,
			})),
		}
	}
}

interface SerperImagesResponse {
	searchParameters: SerperSearchParameters
	images: SerperImage[]
	credits: number
}

interface SerperVideosResponse {
	searchParameters: SerperSearchParameters
	videos: SerperVideo[]
	credits: number
}

interface SerperImage {
	title: string
	imageUrl: string
	imageWidth: number
	imageHeight: number
	thumbnailUrl: string
	thumbnailWidth: number
	thumbnailHeight: number
	source: string
	domain: string
	link: string
	googleUrl: string
	position: number
}

export interface SerperVideo {
	title: string
	link: string
	snippet: string
	imageUrl: string
	duration: string
	source: any
	channel: string
	date: string
	position: number
}

interface SerperSearchParameters {
	q: string
	hl: string
	type: string
	engine: string
	num: number
}
