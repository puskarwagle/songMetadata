const mm = require('music-metadata');
const axios = require('axios');
const util = require('util');

const sampleFileName = 'happy pills - norah jones.mp3';

(async () => {
  try {
    const metadata = await mm.parseFile(sampleFileName);

    // original metadata
    console.log(util.inspect(metadata, { showHidden: false, depth: null }));

    const musicBrainzResponse = await axios.get('https://musicbrainz.org/ws/2/recording/', {
      params: {
        query: `recording:${sampleFileName}`,
        fmt: 'json',
      },
    });

    const musicBrainzData = musicBrainzResponse.data;

    // Filter and extract the relevant information (e.g., the first recording)
    const originalRecording = musicBrainzData.recordings && musicBrainzData.recordings[0];

    // Merge the MusicBrainz data with the original metadata
    const updatedMetadata = { ...metadata, ...originalRecording };

    // console.log(util.inspect(updatedMetadata, { showHidden: false, depth: null }));
  } catch (error) {
    console.error(error.message);
  }
})();
