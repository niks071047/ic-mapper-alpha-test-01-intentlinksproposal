import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Collapse,
  Divider,
  Button,
  Stack,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type MenuItem = {
  id: string;
  title: string;
  lat?: number;
  lon?: number;
  imageUrl?: string;
  googleMapsUrl?: string;
  appleMapsUrl?: string;
};

type Menu = {
  id: string;
  title: string;
  items: MenuItem[];
};

const MENU_DATA: Menu[] = [
  {
    id: 'venue',
    title: 'Venue',
    items: [
      {
        id: 'moa-arena',
        title: 'MOA Arena',
        lat: 14.53194,
        lon: 120.98361,
        googleMapsUrl: `https://maps.app.goo.gl/evtUquVzJYfDbjueA`, // TODO: PALITAN NG EXACT POI LINKS
        appleMapsUrl: `https://maps.apple/p/5DAebuLS9PDGqy`,
        imageUrl:
          'https://www.mallofasia-arena.com/wp-content/uploads/2024/07/MOA-ARENA_Optimized-scaled.jpg',
      },
      {
        id: 'smx',
        title: 'SMX',
        lat: 14.531925,
        lon: 120.981707,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.531925,120.981707`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.531925,120.981707&q=SMX%20Convention%20Center`,
        imageUrl:
          'https://www.smxconventioncenter.com/wp-content/uploads/2025/03/cropped-SMX-Clark.jpg',
      },
    ],
  },
  {
    id: 'malls',
    title: 'Malls',
    items: [
      {
        id: 'moa-main',
        title: 'Mall of Asia Main Mall',
        lat: 14.5350667,
        lon: 120.9821528,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.5350667,120.9821528`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.5350667,120.9821528&q=SM+Mall+of+Asia`,
        imageUrl: 'https://prd-contents.smsupermalls.com/data/2025/02/67bd6ae970feb1740466921.jpg',
      },
      {
        id: 'moa-ent',
        title: 'Mall of Asia Entertainment Mall',
        lat: 14.5350667,
        lon: 120.9821528,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.5350667,120.9821528`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.5350667,120.9821528&q=MOA%20Entertainment%20Mall`,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/7/78/SM_Mall_of_Asia_-_Entertainment_Music_Hall_%28Bay_City%2C_Pasay%29%282017-12-31%29.jpg',
      },
      {
        id: 'ayala-manila-bay',
        title: 'Ayala Malls Manila Bay',
        lat: 14.52342,
        lon: 120.9881,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.52342,120.98810`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.52342,120.98810&q=Ayala%20Malls%20Manila%20Bay`,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Ayala_Malls_Manila_Bay_01.jpg',
      },
      {
        id: 'venice',
        title: 'Venice Grand Canal Mall',
        lat: 14.53361,
        lon: 121.05111,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.53361,121.05111`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.53361,121.05111&q=Venice%20Grand%20Canal%20Mall`,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Venice_Grand_Canal_Taguig_gondola.jpg/250px-Venice_Grand_Canal_Taguig_gondola.jpg',
      },
    ],
  },
  {
    id: 'attractions',
    title: 'Attractions',
    items: [
      {
        id: 'space-time',
        title: 'Space and Time Cube Museum & Dessert Museum',
        lat: 14.531889,
        lon: 120.980444,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.531889,120.980444`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.531889,120.980444&q=Space+and+Time+Cube+Museum`,
        imageUrl:
          'https://d2nnykqiaju69u.cloudfront.net/pslife_photos/Maricel_temp/advert/2025-Aug-11-Space%26Time%20Cube/Space%20%26%20Time%20Tunnel%20Dinosaur.jpg',
      },
      {
        id: 'moa-eye',
        title: 'MOA Eye Ferris Wheel',
        lat: 14.532923,
        lon: 120.979147,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.532923,120.979147`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.532923,120.979147&q=MOA%20Eye`,
        imageUrl:
          'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_960,h_572/w_59,x_11,y_11,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tbh06r8naic8htshtwwt/SMbytheBayAmusementParkRide-All-You-CanDayPass.jpg',
      },
      {
        id: 'okada-fountain',
        title: "Okada Manila's Dancing Fountain Show",
        lat: 14.51503,
        lon: 120.97973,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.51503,120.97973`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.51503,120.97973&q=Okada%20Manila`,
        imageUrl: 'https://media.philstar.com/photos/2022/08/02/1_2022-08-02_23-47-02.jpg',
      },
      {
        id: 'newport',
        title: 'Newport World Resorts',
        lat: 14.519062,
        lon: 121.019232,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.519062, 121.019232`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.519062, 121.019232&q=Newport%20World%20Resorts`,
        imageUrl:
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/483820382.jpg?k=ac5db78e9bad5eaccab432c2f44e689ec041a3fd2cceb4f5d29b679f03e2e44c&o=',
      },
      {
        id: 'art-in-island',
        title: 'Art in Island',
        lat: 14.622611,
        lon: 121.057611,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.622611,121.057611`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.622611,121.057611&q=Art%20in%20Island`,
        imageUrl:
          'https://cdn.phonebooky.com/blog/wp-content/uploads/2019/08/14101938/BKY-JC-ArtinIsland-2070447.jpg',
      },
      {
        id: 'balikbayan',
        title: 'Balikbayan Handicrafts Corporation',
        lat: 14.549792,
        lon: 121.023515,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=14.549792, 121.023515`,
        appleMapsUrl: `https://maps.apple.com/?ll=14.549792, 121.023515&q=Balikbayan%20Handicrafts`,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUaKoVySpMJNsv3XsC3zTIJbz19a986ZLWQ&s',
      },
    ],
  },
];

// Platform detection helper
function detectPlatform(): 'android' | 'ios' | 'desktop' | 'unknown' {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';

  const isAndroid = /android/i.test(ua);
  const isIOS =
    /ipad|iphone|ipod/i.test(ua) ||
    (/iPad/.test(platform) &&
      /MacIntel/.test(navigator.platform) &&
      (navigator as any).maxTouchPoints > 1);

  if (isAndroid) return 'android';
  if (isIOS) return 'ios';

  const isDesktop = /macintosh|windows|linux/i.test(ua) || /Mac|Win|Linux/.test(platform);
  if (isDesktop) return 'desktop';

  return 'unknown';
}

// URL builders
function buildGeoUri(lat: number, lon: number, label?: string) {
  const encodedLabel = label ? `(${encodeURIComponent(label)})` : '';
  return `geo:${lat},${lon}?q=${lat},${lon}${encodedLabel}`;
}
function buildGoogleMapsAppUri(lat: number, lon: number, label?: string) {
  return `comgooglemaps://?q=${lat},${lon}${label ? `(${encodeURIComponent(label)})` : ''}`;
}
function buildGoogleMapsWeb(lat: number, lon: number, label?: string) {
  return `https://www.google.com/maps?q=${lat},${lon}${label ? `(${encodeURIComponent(label)})` : ''}`;
}
function buildAppleMapsUrl(lat: number, lon: number, label?: string) {
  return `https://maps.apple.com/?q=${lat},${lon}${label ? `(${encodeURIComponent(label)})` : ''}`;
}
function buildAppleMapsScheme(label?: string) {
  return label ? `maps://?q=${encodeURIComponent(label)}` : 'maps://';
}

// try open with fallback
function tryOpenWithFallback(schemeUrl: string, fallbackUrl: string, useNewTabFallback = true) {
  try {
    window.location.href = schemeUrl;
  } catch (e) {
    // ignore
  }
  setTimeout(() => {
    try {
      if (useNewTabFallback) {
        window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = fallbackUrl;
      }
    } catch (e) {
      // ignore
    }
  }, 700);
}

export default function ExplorerMapPrototype(): React.ReactElement {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const platform = useMemo(() => detectPlatform(), []);

  function toggleMenu(id: string) {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function openLocation(item: MenuItem) {
    if (item.lat == null || item.lon == null) {
      if (item.googleMapsUrl) {
        window.open(item.googleMapsUrl, '_blank', 'noopener,noreferrer');
      } else if (item.appleMapsUrl) {
        window.open(item.appleMapsUrl, '_blank', 'noopener,noreferrer');
      }
      return;
    }
    const lat = item.lat;
    const lon = item.lon;
    const label = item.title;

    if (platform === 'android') {
      const geo = buildGeoUri(lat, lon, label);
      const googleWeb = item.googleMapsUrl ?? buildGoogleMapsWeb(lat, lon, label);
      tryOpenWithFallback(geo, googleWeb, true);
      return;
    }

    if (platform === 'ios') {
      const appleScheme = buildAppleMapsScheme(label);
      const appleWeb = item.appleMapsUrl ?? buildAppleMapsUrl(lat, lon, label);
      tryOpenWithFallback(appleScheme, appleWeb, true);
      return;
    }

    const googleWeb = item.googleMapsUrl ?? buildGoogleMapsWeb(lat, lon, label);
    window.open(googleWeb, '_blank', 'noopener,noreferrer');
  }

  function openGoogleMaps(item: MenuItem) {
    if (item.lat == null || item.lon == null) {
      if (item.googleMapsUrl) window.open(item.googleMapsUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    const lat = item.lat;
    const lon = item.lon;
    const label = item.title;
    const appUri = buildGoogleMapsAppUri(lat, lon, label);
    const web = item.googleMapsUrl ?? buildGoogleMapsWeb(lat, lon, label);
    tryOpenWithFallback(appUri, web, true);
  }

  function openAppleMaps(item: MenuItem) {
    if (item.lat == null || item.lon == null) {
      if (item.appleMapsUrl) window.open(item.appleMapsUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    const lat = item.lat;
    const lon = item.lon;
    const label = item.title;
    const scheme = buildAppleMapsScheme(label);
    const web = item.appleMapsUrl ?? buildAppleMapsUrl(lat, lon, label);
    tryOpenWithFallback(scheme, web, true);
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', p: 3 }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            SELF GUIDED TOUR MAP
          </Typography>
          <Typography color="text.secondary">
            JW EVENT - INTERNATIONAL CONVENTION <br />
            Platform detected: <strong>{platform}</strong>.
          </Typography>
        </Paper>

        <Box sx={{ display: 'grid', gap: 2 }}>
          <List component="nav" disablePadding>
            {MENU_DATA.map((menu) => {
              const isOpen = !!openMenus[menu.id];
              return (
                <Box key={menu.id} sx={{ mb: 1 }}>
                  <Paper elevation={1} sx={{ overflow: 'hidden' }}>
                    <ListItemButton
                      onClick={() => toggleMenu(menu.id)}
                      aria-expanded={isOpen}
                      sx={{
                        px: 2,
                        py: 1.25,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'background.paper',
                        '&:hover': { backgroundColor: 'action.hover' },
                      }}
                    >
                      <Box>
                        <Typography variant="h6">{menu.title}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ExpandMoreIcon
                          sx={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 250ms',
                          }}
                        />
                      </Box>
                    </ListItemButton>

                    <Collapse in={isOpen} timeout={300} unmountOnExit>
                      <List disablePadding>
                        {menu.items.map((item, idx) => (
                          <React.Fragment key={item.id}>
                            {/* Sub-item container: responsive layout */}
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'flex-start', sm: 'center' },
                                px: 2,
                                py: 1.25,
                                gap: 2,
                              }}
                            >
                              <ListItemAvatar sx={{ minWidth: 84 }}>
                                <Avatar
                                  variant="rounded"
                                  src={item.imageUrl}
                                  sx={{
                                    width: 84,
                                    height: 56,
                                    bgcolor: 'action.disabledBackground',
                                  }}
                                />
                              </ListItemAvatar>

                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {item.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {item.lat && item.lon
                                    ? `${item.lat}, ${item.lon}`
                                    : 'Coordinates not set'}
                                </Typography>
                              </Box>

                              {/* Buttons placed below content on small screens */}
                              <Box
                                sx={{
                                  width: '100%',
                                  display: 'flex',
                                  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                }}
                              >
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{ mt: { xs: 1, sm: 0 }, flexWrap: 'wrap' }}
                                >
                                  <Tooltip title="Quick open (best available for your device)">
                                    <Button
                                      variant="contained"
                                      size="small"
                                      onClick={() => openLocation(item)}
                                    >
                                      Open
                                    </Button>
                                  </Tooltip>

                                  {platform === 'android' && (
                                    <>
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => openGoogleMaps(item)}
                                      >
                                        Google
                                      </Button>
                                    </>
                                  )}

                                  {platform === 'ios' && (
                                    <>
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => openAppleMaps(item)}
                                      >
                                        Apple
                                      </Button>
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => openGoogleMaps(item)}
                                      >
                                        Google
                                      </Button>
                                    </>
                                  )}

                                  {platform === 'desktop' && (
                                    <>
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => openGoogleMaps(item)}
                                      >
                                        Google Web
                                      </Button>
                                    </>
                                  )}

                                  {platform === 'unknown' && (
                                    <>
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => openGoogleMaps(item)}
                                      >
                                        Open Maps
                                      </Button>
                                    </>
                                  )}
                                </Stack>
                              </Box>
                            </Box>

                            {idx < menu.items.length - 1 && (
                              <Divider component="li" sx={{ mx: 2 }} />
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                    </Collapse>
                  </Paper>
                </Box>
              );
            })}
          </List>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Sampol <br />
              Sampol <br />
              Sampol <br />
              Sampol <br />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
