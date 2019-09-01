/**
 * @typedef {object} StreamData
 * @property {string} [air_end_time]
 * @property {string} [air_start_time]
 * @property {number} duration
 * @property {number} fixed
 * @property {number} id
 * @property {object} mixes_id
 * @property {number} mixes_id.id
 * @property {string} mixes_id.link
 * @property {string} mixes_id.model
 * @property {string} path
 * @property {number} premiere
 * @property {string} [scheduled_end_time]
 * @property {string} [scheduled_start_time]
 * @property {number} [startTime]
 * @property {any} skip_time
 * @property {string} station
 */

/**
 * @typedef {object} S3
 * @property {string} url
 * @property {string} mime
 * @property {string} filename
 * @property {number} filesize
 * @property {string} s3_filename
 */

/**
 * @typedef {object} ModelRef
 * @property {number} id
 * @property {string} model
 * @property {string} link
 */

/**
 * @typedef {object} MixData
 * @property {number} id
 * @property {string} title
 * @property {string} url
 * @property {ModelRef} artist_id
 * @property {string[]} genre
 * @property {{title: string, artist: string}[]} track_list
 * @property {S3} mix_url
 * @property {S3} mix_url_64k
 * @property {ModelRef} show_id
 * @property {ModelRef} episode_id
 * @property {string} included_as
 * @property {number} allow_playing
 * @property {number} reach
 * @property {number} favorite_count
 */

module.exports = {}
