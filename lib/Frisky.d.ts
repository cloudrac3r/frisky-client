declare class Frisky {
	public managers: { stream: import("./StreamManager"); mix: import("./MixManager"); episode: import("./EpisodeManager") }
	public socket: import("./ReconnectingWebSocket")

	public process(data: import("./types").StreamData[]): void
}

export = Frisky
