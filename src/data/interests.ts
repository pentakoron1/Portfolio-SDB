export const interestTree: Record<string, Record<string, string[]>> = {
    Videography: {
        'FPV Drone': ['Betaflight', 'Blender'],
        'Video Editing': ['DaVinci Resolve'],
        'Filmaking':[],
    },
    Electronics: {
        Soldering: ['KiCad'],
        Microcontrollers: ['Arduino', 'KiCad'],
        'FPV Drone':['Betaflight', 'Blender'],
    },
    Programming: {
        'App Dev': ['Flutter', 'Dart'],
        'Web Dev': ['HTML', 'TypeScript'],
        Microcontrollers: ['C'],
    },
    Design: {
        CAD: ['Onshape', 'Shap3D'],
        '3D Printing': ['Onshape', 'Shap3D', 'Blender'],
        'Graphic/logo Design': ['Inkscape', 'Affinity'],
        'Drawing': [],
    },
    Sports: {
        Calisthenics:[],
        Running: [],
        Skating: [],
        Bouldering: [],
        Trampoline: [],
    },
}