/*
Sample data:
{
	"id": 47385,
	"show_id": {
		"id": 42808,
		"model": "Shows",
		"link": "v3/shows/42808"
	},
	"air_start": "2019-08-28T14:00:00.000Z",
	"air_end": "2019-08-28T16:00:00.000Z",
	"title": "inFlowmotion - 28 August, 2019",
	"url": "08-28-2019",
	"summary": "",
	"genre": [
		"Progressive House"
	],
	"artist_id": {
		"id": 22066,
		"model": "Artists",
		"link": "v3/artists/22066"
	},
	"image": {
		"url": "https://s3.amazonaws.com/media.friskyradio.com/showmain/1537107280-inflowmotion.png",
		"mime": "image/png",
		"filename": "inflowmotion.png",
		"filesize": 236221,
		"thumb_url": "https://s3.amazonaws.com/media.friskyradio.com/1537107280-inflowmotion-thumb.png",
		"custom_url": "",
		"image_width": 650,
		"s3_filename": "showmain/1537107280-inflowmotion.png",
		"thumb_width": 650,
		"image_height": 340,
		"s3_thumbname": "1537107280-inflowmotion-thumb.png",
		"thumb_height": 340,
		"thumb_filesize": 236221
	},
	"thumbnail": {
		"url": "https://s3.amazonaws.com/media.friskyradio.com/showthumb/1537107280-inflowmotion.png",
		"mime": "image/png",
		"filename": "inflowmotion.png",
		"filesize": 34159,
		"thumb_url": "https://s3.amazonaws.com/media.friskyradio.com/1537107280-inflowmotion-thumb.png",
		"custom_url": "",
		"image_width": 216,
		"s3_filename": "showthumb/1537107280-inflowmotion.png",
		"thumb_width": 216,
		"image_height": 154,
		"s3_thumbname": "1537107280-inflowmotion-thumb.png",
		"thumb_height": 154,
		"thumb_filesize": 40165
	},
	"album_art": {
		"url": "https://s3.amazonaws.com/media.friskyradio.com/shows_albumart/1537107281-inflowmotion.png",
		"mime": "image/png",
		"filename": "inflowmotion.png",
		"filesize": 353499,
		"thumb_url": "https://s3.amazonaws.com/media.friskyradio.com/1537107281-inflowmotion-thumb.png",
		"custom_url": "",
		"image_width": 600,
		"s3_filename": "shows_albumart/1537107281-inflowmotion.png",
		"thumb_width": 600,
		"image_height": 600,
		"s3_thumbname": "1537107281-inflowmotion-thumb.png",
		"thumb_height": 600,
		"thumb_filesize": 353499
	},
	"status": "open"
}
*/

class Episode {
	constructor(id) {
		this.id = id

		this.data = null
	}
	setData(data) {
		this.data = data
	}
}

module.exports = Episode
