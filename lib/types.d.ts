export type StreamData = {
	air_end_time?: string
	air_start_time?: string
	duration: number
	fixed: number
	id: number
	mixes_id: {
		id: number
		link: string
		model: string
	}
	path: string
	premiere: number
	scheduled_end_time?: string
	scheduled_start_time?: string
	startTime?: number
	skip_time: Record<string, unknown>
	station: string
}

export type S3 = {
	url: string
	mime: string
	filename: string
	filesize: number
	s3_filename: string
}

export interface S3Image extends S3 {
	thumb_url: string
	thumb_width: number
	thumb_height: number
	thumb_filesize: number
	s3_thumbname: string
	mime: string
	custom_url: string
}

export type ModelRef = {
	id: number
	model: string
	link: string
}

export type MixData = {
	id: number
	title: string
	url: string
	artist_id: ModelRef
	genre: string[]
	track_list: { title: string; artist: string; }[]
	mix_url: S3
	mix_url_64k: S3
	show_id: ModelRef
	episode_id: ModelRef
	included_as: string
	allow_playing: number
	reach: number
	favorite_count: number
}

export type EpisodeData = {
	id: number
	show_id: ModelRef
	air_start: string
	air_end: string
	title: string
	url: string
	summary: string
	genre: string[]
	artist_id: ModelRef
	image: S3Image
	thumbnail: S3Image
	album_art: S3Image
	status: string
}
