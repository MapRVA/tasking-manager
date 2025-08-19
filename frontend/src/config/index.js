// Runtime environment variable injection support
const getEnvVar = (key, defaultValue) => {
  // Try to get from runtime environment first (injected at container startup)
  if (typeof window !== 'undefined' && window._env_ && window._env_[key] !== undefined) {
    return window._env_[key];
  }
  // Fall back to build-time environment
  if (defaultValue !== undefined) {
    return process.env[key] || defaultValue;
  }
  return process.env[key];
};

// API ENDPOINTS
export const API_VERSION = getEnvVar('TM_APP_API_VERSION', 'v2');
export const API_URL =
  getEnvVar('TM_APP_API_URL', 'http://127.0.0.1:5000') + '/api/' + API_VERSION + '/';
export const OHSOME_STATS_BASE_URL = getEnvVar(
  'OHSOME_STATS_BASE_URL',
  'https://stats.now.ohsome.org',
);
export const OHSOME_STATS_API_URL = getEnvVar(
  'OHSOME_STATS_API_URL',
  'https://stats.now.ohsome.org/api',
);
// APPLICATION SETTINGS
export const DEFAULT_LOCALE = getEnvVar('TM_DEFAULT_LOCALE', 'en');
export const ENVIRONMENT = getEnvVar('REACT_APP_ENVIRONMENT', '');
export const PROJECTCARD_CONTRIBUTION_SHOWN_THRESHOLD = getEnvVar(
  'REACT_APP_PROJECTCARD_CONTRIBUTION_SHOWN_THRESHOLD',
  '5',
);
export const INTERMEDIATE_LEVEL_COUNT = Number(getEnvVar('TM_MAPPER_LEVEL_INTERMEDIATE', '250'));
export const ADVANCED_LEVEL_COUNT = Number(getEnvVar('TM_MAPPER_LEVEL_ADVANCED', '500'));
export const MAPBOX_TOKEN = getEnvVar('TM_MAPBOX_TOKEN', '');
export const ENABLE_SERVICEWORKER = getEnvVar('TM_ENABLE_SERVICEWORKER', '0');
export const MAX_AOI_AREA = Number(getEnvVar('TM_MAX_AOI_AREA', '5000'));
export const MAX_FILESIZE = parseInt(getEnvVar('TM_IMPORT_MAX_FILESIZE', '1000000')) || 1000000; // bytes

// ORGANISATIONAL INFORMATION
export const ORG_NAME = getEnvVar('TM_ORG_NAME', 'MapRVA');
export const ORG_CODE = getEnvVar('TM_ORG_CODE', 'MapRVA');
export const ORG_URL = getEnvVar('TM_ORG_URL', 'https://maprva.org');
export const ORG_LOGO = getEnvVar('TM_ORG_LOGO', 'https://maprva.org/img/logo.svg');
export const HOMEPAGE_IMG_HIGH = getEnvVar('TM_HOMEPAGE_IMG_HIGH', '');
export const HOMEPAGE_IMG_LOW = getEnvVar('TM_HOMEPAGE_IMG_LOW', '');
export const OSM_CLIENT_ID = getEnvVar('TM_CLIENT_ID', '');
export const OSM_REDIRECT_URI = getEnvVar('TM_REDIRECT_URI', '');
export const ORG_PRIVACY_POLICY_URL = getEnvVar('TM_ORG_PRIVACY_POLICY_URL', '');
export const OSM_REGISTER_URL = getEnvVar(
  'OSM_REGISTER_URL',
  'https://www.openstreetmap.org/user/new',
);
export const ORG_TWITTER = getEnvVar('TM_ORG_TWITTER', '');
export const ORG_FB = getEnvVar('TM_ORG_FB', '');
export const ORG_INSTAGRAM = getEnvVar('TM_ORG_INSTAGRAM', '');
export const ORG_YOUTUBE = getEnvVar('TM_ORG_YOUTUBE', '');
export const ORG_GITHUB = getEnvVar('TM_ORG_GITHUB', 'https://github.com/MapRVA');
export const MATOMO_ID = getEnvVar('TM_MATOMO_ID', '');
export const SERVICE_DESK = getEnvVar('TM_SERVICE_DESK', '');
export const IMAGE_UPLOAD_SERVICE = getEnvVar('TM_IMAGE_UPLOAD_API_URL', '');
export const TM_DEFAULT_CHANGESET_COMMENT = getEnvVar(
  'TM_DEFAULT_CHANGESET_COMMENT',
  '#hotosm-project',
);
export const HOMEPAGE_VIDEO_URL = getEnvVar('TM_HOMEPAGE_VIDEO_URL', '');
// Sentry.io DSN
export const SENTRY_FRONTEND_DSN = getEnvVar('TM_SENTRY_FRONTEND_DSN', '');

// OSM API and Editor URLs
export const OSM_SERVER_URL = getEnvVar('OSM_SERVER_URL', 'https://www.openstreetmap.org');
export const OSM_SERVER_API_URL = getEnvVar('OSM_SERVER_API_URL', 'https://api.openstreetmap.org');
export const ID_EDITOR_URL = getEnvVar(
  'ID_EDITOR_URL',
  'https://www.openstreetmap.org/edit?editor=id&',
);
export const POTLATCH2_EDITOR_URL = getEnvVar(
  'POTLATCH2_EDITOR_URL',
  'https://www.openstreetmap.org/edit?editor=potlatch2',
);
export const RAPID_EDITOR_URL = getEnvVar('RAPID_EDITOR_URL', 'https://mapwith.ai/rapid');
export const EXPORT_TOOL_S3_URL = getEnvVar('EXPORT_TOOL_S3_URL', '');
export const ENABLE_EXPORT_TOOL = getEnvVar('ENABLE_EXPORT_TOOL', '');
export const DEFAULT_VALIDATOR_TEAM_ID = getEnvVar('DEFAULT_VALIDATOR_TEAM_ID', null);

export const TASK_COLOURS = {
  READY: '#fff',
  LOCKED_FOR_MAPPING: '#fff',
  MAPPED: '#ade6ef',
  LOCKED_FOR_VALIDATION: '#ade6ef',
  VALIDATED: '#40ac8c',
  INVALIDATED: '#fceca4',
  BADIMAGERY: '#d8dae4',
  PRIORITY_AREAS: '#efd1d1',
};

export const CHART_COLOURS = {
  red: '#d73f3f',
  green: '#3e9c67',
  blue: '#3389D6',
  orange: '#f09733',
  white: '#fff',
  gray: '#C9C9C9',
};

const fallbackRasterStyle = {
  version: 8,
  // "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'],
      tileSize: 128,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright/">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      id: 'simple-tiles',
      type: 'raster',
      source: 'raster-tiles',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

const wmsDensityStyle = {
  version: 8,
  glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: [
        'https://sedac.ciesin.columbia.edu/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=gpw-v3:gpw-v3-population-density-future-estimates_2005',
      ],
      tileSize: 256,
      attribution:
        '© <a href="https://sedac.ciesin.columbia.edu">Socioeconomic Data and Applications Center (SEDAC)</a>',
    },
  },
  layers: [
    {
      id: 'simple-tiles',
      type: 'raster',
      source: 'raster-tiles',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

const bingStyle = {
  version: 8,
  sprite: 'https://maps.tilehosting.com/styles/basic/sprite',
  glyphs:
    'https://maps.tilehosting.com/fonts/{fontstack}/{range}.pbf.pict?key=alS7XjesrAd6uvek9nRE',
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: [
        'https://ecn.t0.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=587&mkt=en-gb&n=z',
        'https://ecn.t1.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=587&mkt=en-gb&n=z',
        'https://ecn.t2.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=587&mkt=en-gb&n=z',
        'https://ecn.t3.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=587&mkt=en-gb&n=z',
      ],
      attribution:
        '© <a href="https://blog.openstreetmap.org/2010/11/30/microsoft-imagery-details">Microsoft Corporation</a>',
    },
  },
  layers: [
    {
      id: 'simple-tiles',
      type: 'raster',
      source: 'raster-tiles',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

// Removed Mapbox-specific basemap options ('bright-v9', 'satellite-v9')
// since we're fully migrated to MapLibre, which does not support mapbox:// styles.
export const BASEMAP_OPTIONS = [
  // { label: 'default', value: 'bright-v9' },
  { label: 'Default', value: fallbackRasterStyle },
  { label: 'density', value: wmsDensityStyle },
  { label: 'bing', value: bingStyle },
  // { label: 'mapbox satellite', value: 'satellite-v9' },
];

// Removed Mapbox style conditional since we're now using MapLibre only.
// MAP_STYLE is now always set to fallbackRasterStyle (BASEMAP_OPTIONS[1].value),
// which is fully compatible with MapLibre and does not require a Mapbox token.
export const MAP_STYLE = BASEMAP_OPTIONS[0].value;

export const MAPBOX_RTL_PLUGIN_URL =
  'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js';

export const DROPZONE_SETTINGS = {
  accept: {
    'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
  },
  multiple: false,
  maxSize: 1 * 1024 * 1024, // 1MB
  // noClick is needed to avoid file picker dialogs when switching between `Write` and `Preview` in `CommentInputField`
  // At time of writing, this workaround is only needed on Chromium based browsers.
  noClick: true,
};

// TM_DEFAULT_CHANGESET_COMMENT without '#'
export const defaultChangesetComment = TM_DEFAULT_CHANGESET_COMMENT.replace('#', '');
