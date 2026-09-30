import { Handler } from '@netlify/functions';
import https from 'https';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

// Helper function to bypass Node 18+ native fetch IPv6 timeout bugs on Windows
const fetchHttps = (urlString: string, options: https.RequestOptions, bodyData?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(urlString);
    const reqOptions: https.RequestOptions = {
      ...options,
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      protocol: urlObj.protocol,
      family: 4 // Force IPv4
    };
    
    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          ok: res.statusCode && res.statusCode >= 200 && res.statusCode < 300,
          json: () => Promise.resolve(data ? JSON.parse(data) : {})
        });
      });
    });
    
    req.on('error', (e) => reject(e));
    if (bodyData) {
      req.write(bodyData);
    }
    req.end();
  });
};

const getAccessToken = async () => {
  const postData = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: refresh_token || '',
  });

  const response = await fetchHttps('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    },
  }, postData);
  
  return response.json();
};

export const handler: Handler = async (event, context) => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetchHttps('https://api.spotify.com/v1/me/player/currently-playing', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`,
      }
    });

    if (response.status === 204 || response.status > 400) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isPlaying: false }),
      };
    }

    const song = await response.json();
    
    if (song.currently_playing_type !== 'track' || !song.item) {
        return {
            statusCode: 200,
            body: JSON.stringify({ isPlaying: false })
        };
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
    const artistId = song.item.artists[0].id;
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;
    
    let genre = 'unknown';
    try {
        const artistRes = await fetchHttps(`https://api.spotify.com/v1/artists/${artistId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        });
        const artistData = await artistRes.json();
        if (artistData.genres && artistData.genres.length > 0) {
            genre = artistData.genres[0]; 
        }
    } catch(e) {
        console.error("Gagal mengambil genre artis");
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=5', 
      },
      body: JSON.stringify({
        album,
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
        genre,
      }),
    };
  } catch (error) {
    console.error("Spotify Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch Spotify status' }),
    };
  }
};
