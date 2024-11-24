import * as dotenv from 'dotenv'
import { TranslateService } from './TranslateService'

dotenv.config()

export enum ImageProvider {
	Stability = 'Stability',
	Nexra = 'Nexra',
	DeepInfra = 'DeepInfra',
	Rocks = 'Rocks',
}

type NexraModel =
	| 'emi'
	| 'dalle'
	| 'dalle-mini'
	| 'prodia'
	| 'prodia-stablediffusion'
	| 'stablediffusion-1.5'
	| 'stablediffusion-2.1'

type DeepInfraModel =
	| 'black-forest-labs/FLUX-1-dev'
	| 'black-forest-labs/FLUX-1-schnell'

type RocksModel =
	| 'flux'
	| 'flux-realism'
	| 'flux-anime'
	| 'flux-3d'
	| 'flux-disney'
	| 'flux-pixel'
	| 'flux-4o'
	| 'any-dark'

type NexraAndDeepInfraData = {
	model:
		| '3Guofeng3_v34.safetensors [50f420de]'
		| 'absolutereality_V16.safetensors [37db0fc3]'
		| 'absolutereality_v181.safetensors [3d9d4d2b]'
		| 'amIReal_V41.safetensors [0a8a2e61]'
		| 'analog-diffusion-1.0.ckpt [9ca13f02]'
		| 'anythingv3_0-pruned.ckpt [2700c435]'
		| 'anything-v4.5-pruned.ckpt [65745d25]'
		| 'anythingV5_PrtRE.safetensors [893e49b9]'
		| 'AOM3A3_orangemixs.safetensors [9600da17]'
		| 'blazing_drive_v10g.safetensors [ca1c1eab]'
		| 'cetusMix_Version35.safetensors [de2f2560]'
		| 'childrensStories_v13D.safetensors [9dfaabcb]'
		| 'childrensStories_v1SemiReal.safetensors [a1c56dbb]'
		| 'childrensStories_v1ToonAnime.safetensors [2ec7b88b]'
		| 'Counterfeit_v30.safetensors [9e2a8f19]'
		| 'cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]'
		| 'cyberrealistic_v33.safetensors [82b0d085]'
		| 'dalcefo_v4.safetensors [425952fe]'
		| 'deliberate_v2.safetensors [10ec4b29]'
		| 'deliberate_v3.safetensors [afd9d2d4]'
		| 'dreamlike-anime-1.0.safetensors [4520e090]'
		| 'dreamlike-diffusion-1.0.safetensors [5c9fd6e0]'
		| 'dreamlike-photoreal-2.0.safetensors [fdcf65e7]'
		| 'dreamshaper_6BakedVae.safetensors [114c8abb]'
		| 'dreamshaper_7.safetensors [5cf5ae06]'
		| 'dreamshaper_8.safetensors [9d40847d]'
		| 'edgeOfRealism_eorV20.safetensors [3ed5de15]'
		| 'EimisAnimeDiffusion_V1.ckpt [4f828a15]'
		| 'elldreths-vivid-mix.safetensors [342d9d26]'
		| 'epicrealism_naturalSinRC1VAE.safetensors [90a4c676]'
		| 'ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]'
		| 'juggernaut_aftermath.safetensors [5e20c455]'
		| 'lofi_v4.safetensors [ccc204d6]'
		| 'lyriel_v16.safetensors [68fceea2]'
		| 'majicmixRealistic_v4.safetensors [29d0de58]'
		| 'mechamix_v10.safetensors [ee685731]'
		| 'meinamix_meinaV9.safetensors [2ec66ab0]'
		| 'meinamix_meinaV11.safetensors [b56ce717]'
		| 'neverendingDream_v122.safetensors [f964ceeb]'
		| 'openjourney_V4.ckpt [ca2f377f]'
		| 'pastelMixStylizedAnime_pruned_fp16.safetensors [793a26e8]'
		| 'portraitplus_V1.0.safetensors [1400e684]'
		| 'protogenx34.safetensors [5896f8d5]'
		| 'Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]'
		| 'Realistic_Vision_V2.0.safetensors [79587710]'
		| 'Realistic_Vision_V4.0.safetensors [29a7afaa]'
		| 'Realistic_Vision_V5.0.safetensors [614d1063]'
		| 'redshift_diffusion-V10.safetensors [1400e684]'
		| 'revAnimated_v122.safetensors [3f4fefd9]'
		| 'rundiffusionFX25D_v10.safetensors [cd12b0ee]'
		| 'rundiffusionFX_v10.safetensors [cd4e694d]'
		| 'sdv1_4.ckpt [7460a6fa]'
		| 'shoninsBeautiful_v10.safetensors [25d8c546]'
		| 'theallys-mix-ii-churned.safetensors [5d9225a4]'
		| 'timeless-1.0.ckpt [7c4971d4]'
		| 'toonyou_beta6.safetensors [980f6b15]'
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
	output_format: 'jpeg' | 'png' | 'webp'
	image?: string
	strength?: number
	negative_prompt?: string
	seed?: number
}

interface NexraOptions {
	model: NexraModel
	data: NexraAndDeepInfraData
}

interface DeepInfraOptions {
	model: DeepInfraModel
	data: NexraAndDeepInfraData
}

interface RocksOptions {
	model: RocksModel
}

type ProviderModelOptions = {
	[ImageProvider.Stability]: StabilityOptions
	[ImageProvider.Nexra]: NexraOptions
	[ImageProvider.DeepInfra]: DeepInfraOptions
	[ImageProvider.Rocks]: RocksOptions
}

export class ImageService {
	static async generate<T extends ImageProvider>(
		prompt: string,
		provider: T = ImageProvider.Nexra as T,
		options: ProviderModelOptions[T],
	): Promise<File | string> {
		switch (provider) {
			case ImageProvider.Stability:
				return Stability.generate(prompt, options as StabilityOptions)
			case ImageProvider.Nexra:
				return Nexra.generate(prompt, options as NexraOptions)
			case ImageProvider.DeepInfra:
				return DeepInfra.generate(prompt, options as DeepInfraOptions)
			case ImageProvider.Rocks:
				return Rocks.generate(prompt, options as RocksOptions)
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

		console.log({ Authorization: `Bearer ${process.env.STABILITY_API_KEY}` })

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
			const arrayBuffer = await response.arrayBuffer()
			const blob = new Blob([arrayBuffer], { type })
			const file = new File([blob], `image.${options.output_format}`, { type })

			return file
		} else {
			throw new Error(`${response.status}: ${await response.text()}`)
		}
	}
}

class Nexra {
	static async generate(
		prompt: string,
		options: NexraOptions,
	): Promise<string> {
		const baseResponse = await fetch(
			'https://nexra.aryahcr.cc/api/image/complements',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					prompt,
					model: options.model,
					data: options.data,
				}),
			},
		)

		if (!baseResponse.ok) {
			throw new Error(
				`status: ${baseResponse.status}, error: ${await baseResponse.text()}`,
			)
		}

		const baseResult = await baseResponse.json()

		let result = null
		let loading = true

		while (loading) {
			const response = await fetch(
				'http://nexra.aryahcr.cc/api/image/complements/' +
					encodeURIComponent(baseResult.id),
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				},
			)
			result = await response.json()

			switch (result.status) {
				case 'pending':
					loading = true
					break
				case 'error':
				case 'completed':
				case 'not_found':
					loading = false
					break
			}
		}

		if (!result?.images?.[0]?.length)
			throw new Error('No valid image found in response.')

		return result.images[0]
	}
}

class DeepInfra {
	static async generate(
		prompt: string,
		options: DeepInfraOptions,
	): Promise<string> {
		const response = await fetch(
			`https://api.deepinfra.com/v1/inference/${options.model}`,
			{
				method: 'POST',
				headers: {
					'Accept': 'text/event-stream',
					'Content-Type': 'application/json',
					'User-Agent': 'Custom-Agent',
				},
				body: JSON.stringify({ prompt, ...options.data }),
			},
		)

		if (!response.ok) {
			throw new Error(
				`status: ${response.status}, error: ${await response.text()}`,
			)
		}

		const result = await response.json()

		return result.images[0].split(';base64,').pop()
	}
}

class Rocks {
	static async generate(
		prompt: string,
		options: RocksOptions,
	): Promise<string> {
		const params = new URLSearchParams({ prompt, model: options.model })

		const response = await fetch(
			`https://api.airforce/imagine?${params.toString()}`,
			{
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'User-Agent': 'Custom-Agent',
				},
			},
		)

		if (!response.ok) {
			throw new Error(
				`status: ${response.status}, error: ${await response.text()}`,
			)
		}

		const binaryImage = await response.arrayBuffer()

		const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
			const bytes = new Uint8Array(buffer)
			const binary = String.fromCharCode(...bytes)
			return typeof window !== 'undefined' ?
					window.btoa(binary)
				:	Buffer.from(binary, 'binary').toString('base64')
		}

		return arrayBufferToBase64(binaryImage)
	}
}
