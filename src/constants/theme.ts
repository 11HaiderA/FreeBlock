export const THEME = {
  colors: {
    // Backgrounds & Board
    bgDark: '#1A0E08',
    bgOverlay: 'rgba(18, 9, 5, 0.82)',
    boardFrame: '#9C5824',
    boardFrameLight: '#E8B376',
    boardFrameDark: '#54290B',
    cellEven: '#75461F',
    cellOdd: '#8A5326',
    cellGridLine: '#542E10',
    
    // Wood Blocks
    woodLight: '#D8A870',
    woodBase: '#BD894E',
    woodDark: '#8F5E2B',
    woodBevelLight: '#F3D2A8',
    woodBevelDark: '#673F18',
    woodGrain: 'rgba(100, 56, 20, 0.25)',
    woodShadow: 'rgba(25, 12, 6, 0.55)',

    // Target Block (Red)
    targetLight: '#F44336',
    targetBase: '#D32F2F',
    targetDark: '#9A0007',
    targetBevelLight: '#FF8A80',
    targetBevelDark: '#5F0909',
    targetGrip: 'rgba(255, 255, 255, 0.35)',

    // Gold & Accents
    gold: '#FFD700',
    goldLight: '#FFF275',
    goldDark: '#C79A00',
    goldGlow: 'rgba(255, 215, 0, 0.45)',

    // Exit Gate
    exitHighlight: '#FFA726',
    exitChevron: '#FFE082',

    // UI & Text
    textLight: '#FDF6E2',
    textMuted: '#C2A789',
    textDark: '#3A1E0D',
    textCounter: '#FF5252',
    cardBg: '#3B2112',
    cardBorder: '#64391F',
    buttonWood: '#AB7842',
    buttonWoodPressed: '#8D5E2D',
    buttonBorderLight: '#D9AB75',
    buttonBorderDark: '#583413',

    // Modal / Status
    success: '#4CAF50',
    danger: '#E53935',
  },
  typography: {
    fontFamily: 'System',
    weightBold: '700' as const,
    weightHeavy: '900' as const,
    weightMedium: '600' as const,
  },
  shadows: {
    board: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 10,
    },
    block: {
      shadowColor: '#120803',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.45,
      shadowRadius: 4,
      elevation: 6,
    },
    button: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 6,
    },
  },
};

export const FONTS = {
  title: 'TitanOne_400Regular',
  button: 'TitanOne_400Regular',
  display: 'TitanOne_400Regular',
  bold: 'Fredoka_700Bold',
  semiBold: 'Fredoka_600SemiBold',
  regular: 'Fredoka_400Regular',
};
