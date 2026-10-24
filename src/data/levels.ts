import { Level } from '../types/game';

export const LEVELS: Level[] = [
  {
    "id": 1,
    "tier": "Beginner",
    "name": "First Light",
    "par": 3,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 4,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 5,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 2,
    "tier": "Beginner",
    "name": "Oak Shifter",
    "par": 4,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 2,
        "col": 4,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v2",
        "row": 4,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 3,
    "tier": "Beginner",
    "name": "Timber Gate",
    "par": 4,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h3",
        "row": 5,
        "col": 2,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 4,
    "tier": "Beginner",
    "name": "Pine Crossing",
    "par": 5,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 4,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v2",
        "row": 3,
        "col": 5,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 3,
        "col": 3,
        "length": 3,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 5,
    "tier": "Beginner",
    "name": "Cedar Maze",
    "par": 5,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 5,
        "col": 3,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h3",
        "row": 5,
        "col": 0,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 6,
    "tier": "Beginner",
    "name": "Birch Breeze",
    "par": 6,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 2,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 7,
    "tier": "Beginner",
    "name": "Maple Run",
    "par": 6,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 3,
        "col": 1,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h3",
        "row": 5,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h4",
        "row": 0,
        "col": 3,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 8,
    "tier": "Beginner",
    "name": "Willow Path",
    "par": 7,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 2,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v2",
        "row": 1,
        "col": 2,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 4,
        "col": 1,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 9,
    "tier": "Beginner",
    "name": "Spruce Trail",
    "par": 7,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 5,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 2,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 10,
    "tier": "Beginner",
    "name": "Cypress Gap",
    "par": 8,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 4,
        "col": 0,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 11,
    "tier": "Beginner",
    "name": "Beech Crossing",
    "par": 8,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h2",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h3",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h4",
        "row": 5,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 4,
        "length": 3,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 12,
    "tier": "Beginner",
    "name": "Elm Corridor",
    "par": 9,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 4,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h3",
        "row": 5,
        "col": 4,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 13,
    "tier": "Intermediate",
    "name": "Chestnut Turn",
    "par": 8,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v2",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h3",
        "row": 4,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v4",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v6",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 14,
    "tier": "Intermediate",
    "name": "Teak Corridor",
    "par": 9,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 1,
        "col": 4,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v2",
        "row": 1,
        "col": 5,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h5",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h6",
        "row": 0,
        "col": 3,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 15,
    "tier": "Intermediate",
    "name": "Walnut Lock",
    "par": 9,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v2",
        "row": 2,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 5,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 3,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 16,
    "tier": "Intermediate",
    "name": "Hickory Knots",
    "par": 10,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 5,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 4,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 17,
    "tier": "Intermediate",
    "name": "Redwood Rush",
    "par": 10,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 4,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h5",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h6",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 18,
    "tier": "Intermediate",
    "name": "Amber Drift",
    "par": 11,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 4,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 5,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 4,
        "length": 3,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 19,
    "tier": "Intermediate",
    "name": "Cherry Ridge",
    "par": 11,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 1,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h3",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v4",
        "row": 1,
        "col": 4,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 5,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 20,
    "tier": "Intermediate",
    "name": "Ashwood Bend",
    "par": 12,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v2",
        "row": 0,
        "col": 5,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 4,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h5",
        "row": 4,
        "col": 3,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 21,
    "tier": "Intermediate",
    "name": "Sycamore Pass",
    "par": 12,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v2",
        "row": 0,
        "col": 4,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 2,
        "col": 5,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h5",
        "row": 5,
        "col": 4,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 22,
    "tier": "Intermediate",
    "name": "Alder Shallows",
    "par": 13,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h3",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 4,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v6",
        "row": 0,
        "col": 5,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h7",
        "row": 5,
        "col": 3,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 23,
    "tier": "Intermediate",
    "name": "Linden Grove",
    "par": 13,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v2",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h3",
        "row": 4,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h5",
        "row": 5,
        "col": 2,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 24,
    "tier": "Intermediate",
    "name": "Poplar Run",
    "par": 14,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 2,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 4,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h5",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v6",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v7",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 25,
    "tier": "Advanced",
    "name": "Mahogany Forge",
    "par": 14,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 3,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 2,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 2,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 26,
    "tier": "Advanced",
    "name": "Sandalwood Sanctum",
    "par": 14,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 27,
    "tier": "Advanced",
    "name": "Ironwood Labyrinth",
    "par": 14,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 28,
    "tier": "Advanced",
    "name": "Royal Teak",
    "par": 14,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v12",
        "row": 1,
        "col": 5,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 29,
    "tier": "Advanced",
    "name": "Ebony Keep",
    "par": 14,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v12",
        "row": 4,
        "col": 5,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 30,
    "tier": "Advanced",
    "name": "Rosewood Bastion",
    "par": 15,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 1,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 2,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 3,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 31,
    "tier": "Advanced",
    "name": "Balsa Enclave",
    "par": 15,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v12",
        "row": 1,
        "col": 5,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 32,
    "tier": "Advanced",
    "name": "Hickory Spire",
    "par": 15,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v12",
        "row": 4,
        "col": 5,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 33,
    "tier": "Advanced",
    "name": "Zebrawood Knot",
    "par": 16,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 1,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 2,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 3,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 34,
    "tier": "Advanced",
    "name": "Olive Redoubt",
    "par": 16,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v12",
        "row": 0,
        "col": 5,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 35,
    "tier": "Advanced",
    "name": "Purpleheart Ring",
    "par": 17,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 2,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 2,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 3,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 36,
    "tier": "Advanced",
    "name": "Cocobolo Citadel",
    "par": 17,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 1,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 37,
    "tier": "Expert",
    "name": "Tigerwood Vault",
    "par": 17,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 1,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 38,
    "tier": "Expert",
    "name": "Wenge Maze",
    "par": 17,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 39,
    "tier": "Expert",
    "name": "Bubinga Labyrinth",
    "par": 18,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 1,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 40,
    "tier": "Expert",
    "name": "Padauk Matrix",
    "par": 18,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 41,
    "tier": "Expert",
    "name": "Koa Bastion",
    "par": 18,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 42,
    "tier": "Expert",
    "name": "Snakewood Complex",
    "par": 18,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 43,
    "tier": "Expert",
    "name": "Iroko Enigma",
    "par": 19,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 2,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 3,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 44,
    "tier": "Expert",
    "name": "Merbau Fortress",
    "par": 19,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 3,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 45,
    "tier": "Expert",
    "name": "Jatoba Chamber",
    "par": 19,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 1,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 46,
    "tier": "Expert",
    "name": "Macassar Sanctum",
    "par": 19,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 1,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 47,
    "tier": "Expert",
    "name": "Bocote Grid",
    "par": 19,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 48,
    "tier": "Expert",
    "name": "Amaranth Lock",
    "par": 19,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v12",
        "row": 4,
        "col": 5,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 49,
    "tier": "Master",
    "name": "Blackwood Apex",
    "par": 20,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 2,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 50,
    "tier": "Master",
    "name": "Grand Sequoia",
    "par": 20,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 51,
    "tier": "Master",
    "name": "Crown of Timber",
    "par": 20,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 52,
    "tier": "Master",
    "name": "Ancient Burl",
    "par": 20,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v12",
        "row": 4,
        "col": 5,
        "length": 2,
        "orientation": "v"
      }
    ]
  },
  {
    "id": 53,
    "tier": "Master",
    "name": "Omega Timber",
    "par": 21,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 54,
    "tier": "Master",
    "name": "Heartwood Crypt",
    "par": 22,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 2,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 55,
    "tier": "Master",
    "name": "Master Labyrinth",
    "par": 23,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 2,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 56,
    "tier": "Master",
    "name": "Lignum Vitae",
    "par": 24,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "h1",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "v2",
        "row": 2,
        "col": 3,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h4",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v5",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "h7",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v8",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "v"
      },
      {
        "id": "h9",
        "row": 5,
        "col": 2,
        "length": 3,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 57,
    "tier": "Master",
    "name": "Eternity Knot",
    "par": 25,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 58,
    "tier": "Master",
    "name": "Sovereign Grain",
    "par": 29,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 2,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 2,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 59,
    "tier": "Master",
    "name": "The Final Squeeze",
    "par": 31,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 2,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 3,
        "length": 2,
        "orientation": "h"
      }
    ]
  },
  {
    "id": 60,
    "tier": "Master",
    "name": "FreeBlock Capstone",
    "par": 34,
    "exitRow": 2,
    "blocks": [
      {
        "id": "target",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "h",
        "isTarget": true
      },
      {
        "id": "v1",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h2",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v3",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v4",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "v5",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h6",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v7",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h8",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v9",
        "row": 2,
        "col": 4,
        "length": 2,
        "orientation": "v"
      },
      {
        "id": "h10",
        "row": 5,
        "col": 3,
        "length": 3,
        "orientation": "h"
      },
      {
        "id": "h11",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "h"
      },
      {
        "id": "v12",
        "row": 2,
        "col": 5,
        "length": 2,
        "orientation": "v"
      }
    ]
  }
];
