import * as dotenv from 'dotenv'
import { TranslateService } from './TranslateService'
import fetch from 'node-fetch'
import { createCanvas, loadImage } from 'canvas'

dotenv.config()

export enum ImageProvider {
	Stability = 'Stability',
}

interface StabilityOptions {
	aspect_ratio:
		| '16:9'
		| '1:1'
		| '21:9'
		| '2:3'
		| '3:2'
		| '4:5'
		| '5:4'
		| '9:16'
		| '9:21'
	output_format: 'jpeg' | 'png' // 'webp' no available for video ai generation
	image?: string
	strength?: number
	negative_prompt?: string
	seed?: number
}

type ProviderModelOptions = {
	[ImageProvider.Stability]: StabilityOptions
}

export class ImageService {
	static async generate<T extends ImageProvider>(
		prompt: string,
		provider: T = ImageProvider.Stability as T,
		options: ProviderModelOptions[T],
	): Promise<File | string> {
		switch (provider) {
			case ImageProvider.Stability:
				return Stability.generate(prompt, options as StabilityOptions)
			default:
				throw new Error('Image Provider not found.')
		}
	}
}

class Stability {
	static async generate(
		inprompt: string,
		options: StabilityOptions,
	): Promise<File> {
		const prompt = await TranslateService.translate(inprompt)

		const formData = new FormData()
		formData.append('prompt', prompt)
		for (const key in options) {
			formData.append(key, options[key as keyof StabilityOptions] as any)
		}

		const response = await fetch(
			'https://api.stability.ai/v2beta/stable-image/generate/ultra',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
					Accept: 'image/*',
				},
				body: formData,
			},
		)

		if (response.ok) {
			const type = `image/${options.output_format}`
			const buffer = Buffer.from(await response.arrayBuffer())

			const image = await loadImage(buffer)
			const canvas = createCanvas(768, 768)
			const context = canvas.getContext('2d')

			context.drawImage(image, 0, 0, 768, 768)

			const resized = canvas.toBuffer('image/png')
			const blob = new Blob([resized], { type: 'image/png' })
			const file = new File([blob], `image.${options.output_format}`, { type })

			return file
		} else {
			throw new Error(`${response.status}: ${await response.text()}`)
		}
	}
}
