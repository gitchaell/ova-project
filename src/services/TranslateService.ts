import fetch from 'node-fetch'

export class TranslateService {
	static async translate(text: string, sourceLang = 'auto', targetLang = 'en') {
		try {
			const escapedStr = encodeURIComponent(text)
			const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${escapedStr}`

			const response = await fetch(url)
			const data = (await response.json()) as any[]
			const result = data?.[0]?.[0]?.[0] || text
			return result
		} catch (error) {
			console.error('Error al traducir el texto:', error)
			throw new Error('No se pudo traducir el texto')
		}
	}
}
