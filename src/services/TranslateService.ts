export class TranslateService {
	static async translate(text: string, sourceLang = 'auto', targetLang = 'en') {
		const escapedStr = encodeURIComponent(text)
		const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${escapedStr}`

		try {
			const response = await fetch(url)
			const data = await response.json()
			const result = data?.[0]?.[0]?.[0] || text
			return result
		} catch (error) {
			console.error('Error al traducir el texto:', error)
			throw new Error('No se pudo traducir el texto')
		}
	}
}
