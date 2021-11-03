declare class QSBuilder {
	public parts: { link: string; model: string; id: number; }[]

	public getString(): string
	public getLength(): number
	public addPart(part: { link: string; model: string; id: number; }): void
	public addLink(link: string): void
}

export = QSBuilder
