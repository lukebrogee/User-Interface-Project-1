/** @typedef {{ id: string, name: string, moisture: number, light: number, waterEvery: number }} CarePreset */
/** @typedef {{ id: string, name: string, scientificName: string, health: number, soilMoisture: number, reservoir: number, humidity: number, currentLight: number, presets: CarePreset[] }} PlantProfile */

/** @type {PlantProfile[]} */
export const plants = [
  {
    id: 'monstera',
    name: 'Monstera',
    scientificName: 'Monstera deliciosa',
    health: 92,
    soilMoisture: 48,
    reservoir: 74,
    humidity: 61,
    currentLight: 5.4,
    presets: [
      { id: 'easygoing', name: 'Easygoing', moisture: 42, light: 5, waterEvery: 5 },
      { id: 'lush', name: 'Lush growth', moisture: 58, light: 7, waterEvery: 3 },
      { id: 'bright', name: 'Bright corner', moisture: 50, light: 9, waterEvery: 4 },
    ],
  },
  {
    id: 'fern',
    name: 'Boston fern',
    scientificName: 'Nephrolepis exaltata',
    health: 86,
    soilMoisture: 67,
    reservoir: 52,
    humidity: 72,
    currentLight: 3.1,
    presets: [
      { id: 'even', name: 'Even moisture', moisture: 72, light: 4, waterEvery: 2 },
      { id: 'woodland', name: 'Woodland shade', moisture: 66, light: 3, waterEvery: 3 },
      { id: 'humid', name: 'Humidity boost', moisture: 75, light: 5, waterEvery: 2 },
    ],
  },
  {
    id: 'succulent',
    name: 'Jade plant',
    scientificName: 'Crassula ovata',
    health: 96,
    soilMoisture: 24,
    reservoir: 88,
    humidity: 38,
    currentLight: 8.2,
    presets: [
      { id: 'dry', name: 'Dry between waterings', moisture: 28, light: 8, waterEvery: 12 },
      { id: 'sun', name: 'Sun soak', moisture: 32, light: 10, waterEvery: 10 },
      { id: 'slow', name: 'Slow season', moisture: 20, light: 6, waterEvery: 16 },
    ],
  },
]

export const waterIntervals = [2, 3, 4, 5, 7, 10, 12, 16]
