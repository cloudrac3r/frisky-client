/*
	Sample data:
	{
		id: 47386,
		title: "inFlowmotion - August 2019 - DepGlobe",
		url: "depglobe-at-08-28-2019",
		artist_id: {
			id: 22066,
			model: "Artists",
			link: "v3/artists/22066"
		},
		genre: [
			"Progressive House"
		],
		track_list: [
			{
				title: "Fisherman (Original Mix)",
				artist: "Nicholas Van Orton"
			}
		]
		mix_url: {
			url: "http://media.friskyradio.com.s3.amazonaws.com/inflowmotion/inflowmotion_aug2019_DepGlobe.mp3",
			mime: "audio/mpeg",
			filename: "inflowmotion_aug2019_DepGlobe.mp3",
			filesize: 292145868,
			s3_filename: "inflowmotion/inflowmotion_aug2019_DepGlobe.mp3"
		},
		mix_url_64k: {
			url: "http://media.friskyradio.com.s3.amazonaws.com/inflowmotion/inflowmotion_aug2019_DepGlobe__96.mp3",
			mime: "audio/mpeg",
			filename: "inflowmotion_aug2019_DepGlobe__96.mp3",
			filesize: 87537930,
			s3_filename: "inflowmotion/inflowmotion_aug2019_DepGlobe__96.mp3"
		},
		show_id: { id: 42808, model: "Shows", link: "v3/shows/42808" },
		episode_id: { id: 47385, model: "Episodes", link: "v3/episodes/47385" },
		included_as: "Host",
		allow_playing: 1,
		reach: 5954,
		favorite_count: 0
	}
*/

class Mix {
	constructor(id) {
		this.id = id

		/**
		 * @type {import("./types").MixData}
		 */
		this.data = null
	}
	setData(data) {
		this.data = data
	}
}

module.exports = Mix
