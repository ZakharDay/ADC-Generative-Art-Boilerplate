import * as Tone from 'tone'

const samples = [
  'samples/00001-Linn-9000-BassDrumrum1.mp3',
  'samples/00002-Linn-9000-Clhh-1.mp3',
  'samples/00003-Linn-9000-Hhclose1.mp3',
  'samples/00004-Linn-9000-Hhclose2.mp3',
  'samples/00005-Linn-9000-Hhopen1.mp3',
  'samples/00006-Linn-9000-Hhopen2.mp3',
  'samples/00007-Linn-9000-Kick-2.mp3',
  'samples/00008-Linn-9000-Kick-1.mp3',
  'samples/00009-Linn-9000-Kick.mp3',
  'samples/00010-Linn-9000-Ophh-2.mp3',
  'samples/00011-Linn-9000-Ophh-1.mp3',
  'samples/00012-Linn-9000-Ride1.mp3',
  'samples/00013-Linn-9000-Ride3.mp3',
  'samples/00014-Linn-9000-Rim-2.mp3',
  'samples/00015-Linn-9000-Rim.mp3',
  'samples/00016-Linn-9000-Snare-2.mp3',
  'samples/00017-Linn-9000-Snare.mp3',
  'samples/00018-Linn-9000-Snr.mp3',
  'samples/00019-Linn-9000-Stick.mp3',
  'samples/00020-Linn-9000-Tom-1.mp3',
  'samples/00021-Linn-9000-Tom-3.mp3',
  'samples/00022-Linn-9000-Tom-4.mp3',
  'samples/00023-Linn-AdrenaLinn1-SnareDrum-3.mp3',
  'samples/00024-Linn-AdrenaLinn1-SnareDrum-7.mp3',
  'samples/00025-Linn-Linndrum-Ride.mp3',
  'samples/00026-Linn-Linndrum-SnareDrum.mp3',
  'samples/00027-Linn-Linndrum-SnareDruml.mp3',
  'samples/00028-Pearl-Drum-X-Hat.mp3',
  'samples/00029-Pearl-Drum-X-Tom-7d.mp3',
  'samples/00030-Pearl-Drum-X-Tom-7e.mp3',
  'samples/00031-Tama-RockStar-Ride.mp3',
  'samples/00032-Tama-RockStar-Snare.mp3',
  'samples/00033-Tama-TS-206-Kick-Short-1B.mp3',
  'samples/00034-Tama-TS-206-Perc-Noise-Long-1.mp3',
  'samples/00035-Tama-TS-206-Perc-Noise-Short-1.mp3',
  'samples/00036-Tama-TS-305-BassDrum-3.mp3',
  'samples/00037-Tama-TS-305-BassDrum-6.mp3',
  'samples/00038-Tama-TS-305-BassDrum-8.mp3',
  'samples/00039-Tama-TS-305-Tom-3.mp3',
  'samples/00040-Tama-TS-500-BassDrum1.mp3',
  'samples/00041-Vermona-DRM1-1.mp3',
  'samples/00042-Vermona-DRM1-10.mp3',
  'samples/00043-Vermona-DRM1-11.mp3',
  'samples/00044-Vermona-DRM1-16.mp3',
  'samples/00045-Vermona-DRM1-17.mp3',
  'samples/00046-Vermona-DRM1-MK3-BassDrum12.mp3',
  'samples/00047-Vermona-DRM1-MK3-BassDrum13.mp3',
  'samples/00048-Vermona-DRM1-MK3-BassDrum25.mp3',
  'samples/00049-Vermona-DRM1-MK3-BassDrum27.mp3',
  'samples/00050-Vermona-DRM1-MK3-BassDrum29.mp3',
  'samples/00051-Vermona-DRM1-MK3-Clap01.mp3',
  'samples/00052-Vermona-DRM1-MK3-Clap07.mp3',
  'samples/00053-Vermona-DRM1-MK3-Clap08.mp3',
  'samples/00054-Vermona-DRM1-MK3-Clap09.mp3',
  'samples/00055-Vermona-DRM1-MK3-Clap10.mp3',
  'samples/00056-Vermona-DRM1-MK3-HH01.mp3',
  'samples/00057-Vermona-DRM1-MK3-HH02.mp3',
  'samples/00058-Vermona-DRM1-MK3-HH19.mp3',
  'samples/00059-Vermona-DRM1-MK3-HH20.mp3',
  'samples/00060-Vermona-DRM1-MK3-SnareDrum02.mp3',
  'samples/00061-Vermona-DRM1-MK3-SnareDrum03.mp3',
  'samples/00062-Vermona-DRM1-MK3-SnareDrum04.mp3',
  'samples/00063-Vermona-DRM1-MK3-SnareDrum10.mp3',
  'samples/00064-Vermona-DRM1-MK3-Tom13.mp3'
]

function createBuffer(path) {
  const sample = new Tone.Buffer(path, () => {
    const buff = sample.get()
  })

  return sample
}

function loadSamples() {
  const loadedSamples = []

  samples.forEach((path, i) => {
    const loadedSample = createBuffer(path)
    loadedSamples.push(loadedSample)
  })

  return loadedSamples
}

export { loadSamples }
