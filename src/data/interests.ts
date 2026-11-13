export const interestTree: Record<string, Record<string, string[]>> = {
    Videography: {
        'FPV Drone': ['DJI Goggles', 'Betaflight', 'Blender'],
        'Video Editing': ['DaVinci Resolve', 'After Effects'],
        Photography: ['Lightroom', 'DaVinci Resolve'],
    },
    Electronics: {
        Soldering: ['KiCad', 'Soldering Iron'],
        Microcontrollers: ['Arduino IDE', 'KiCad', 'ESP32'],
    },
    '3D Design': {
        CAD: ['Onshape', 'Fusion 360'],
        '3D Printing': ['Onshape', 'PrusaSlicer'],
    },
}