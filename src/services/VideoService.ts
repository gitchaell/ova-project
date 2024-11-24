import * as dotenv from 'dotenv'
import sharp from 'sharp'
import fetch from 'node-fetch'

dotenv.config()

export enum VideoProvider {
	Stability = 'Stability',
}

interface StabilityOptions {
	seed?: number
	cfg_scale?: number
	motion_bucket_id?: string
}

type ProviderModelOptions = {
	[VideoProvider.Stability]: StabilityOptions
}

export class VideoService {
	static async generate<T extends VideoProvider>(
		imageUrl: string,
		provider: T = VideoProvider.Stability as T,
		options: ProviderModelOptions[T],
	): Promise<string> {
		switch (provider) {
			case VideoProvider.Stability:
				return Stability.generate(imageUrl, options as StabilityOptions)
			default:
				throw new Error('Provider not found.')
		}
	}

	static async getVideo<T extends VideoProvider>(
		videoId: string,
		provider: T = VideoProvider.Stability as T,
	): Promise<File> {
		switch (provider) {
			case VideoProvider.Stability:
				return Stability.getVideo(videoId)
			default:
				throw new Error('Provider not found.')
		}
	}
}

class Stability {
	static async generate(
		imageUrl: string,
		options: StabilityOptions,
	): Promise<string> {
		const imageResponse = await fetch(imageUrl)
		const imageBuffer = await imageResponse.arrayBuffer()
		const resizedBuffer = await sharp(imageBuffer).resize(768, 768).toBuffer()
		const imageBlob = new Blob([resizedBuffer], { type: 'image/png' })

		const formData = new FormData()
		formData.append('image', imageBlob)
		formData.append('seed', options.seed?.toString() || '0')
		formData.append('cfg_scale', options.cfg_scale?.toString() || '1.8')
		formData.append(
			'motion_bucket_id',
			options.motion_bucket_id?.toString() || '127',
		)

		const response = await fetch(
			'https://api.stability.ai/v2beta/image-to-video',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
				},
				body: formData,
			},
		)

		if (response.ok) {
			const data = (await response.json()) as { id: string }
			return data?.id || ''
		} else {
			throw new Error(`${response.status}: ${await response.text()}`)
		}
	}

	static async getVideo(videoId: string): Promise<File> {
		const response = await fetch(
			`https://api.stability.ai/v2beta/image-to-video/result/${videoId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
					Accept: 'video/*',
				},
			},
		)

		if (response.status === 202) {
			throw new Error('Generation is still running, try again in 10 seconds.')
		} else if (response.status === 200) {
			const type = 'video/mp4'
			const arrayBuffer = await response.arrayBuffer()
			const blob = new Blob([arrayBuffer], { type })
			const file = new File([blob], 'video.mp4', { type })
			return file
		} else {
			throw new Error(`Response ${response.status}: ${await response.text()}`)
		}
	}
}
