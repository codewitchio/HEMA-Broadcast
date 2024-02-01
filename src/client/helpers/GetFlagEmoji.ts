export function GetFlagEmoji(countryCode?: string): string {
    if (countryCode) {
        if (countryCode == "UK") { countryCode = "GB" }
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0))
        return String.fromCodePoint(...codePoints)
    } else {
        return "❓"
    }
}