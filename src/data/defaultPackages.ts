import { Package } from '@/types';

export const PACKAGE_IDS = {
  burj30: '11111111-1111-4111-8111-000000000030',
  atlantis60: '11111111-1111-4111-8111-000000000060',
  skyline90: '11111111-1111-4111-8111-000000000090',
  ultimate120: '11111111-1111-4111-8111-000000000120',
} as const;

const createdAt = '2025-01-01T00:00:00.000Z';

export const DEFAULT_PACKAGES: Package[] = [
  {
    id: PACKAGE_IDS.burj30,
    name: '30 Minutes - Burj Al Arab Tour',
    duration_minutes: 30,
    price_aed: 250,
    description: 'Experience the thrill of jet skiing with stunning views of the iconic Burj Al Arab',
    image_url: '/burj.jpg',
    max_participants: 2,
    is_active: true,
    display_order: 1,
    created_at: createdAt,
  },
  {
    id: PACKAGE_IDS.atlantis60,
    name: '60 Minutes - Atlantis Tour',
    duration_minutes: 60,
    price_aed: 450,
    description: 'Extended tour featuring Atlantis The Palm and surrounding areas',
    image_url: '/atlantis.jpg',
    max_participants: 2,
    is_active: true,
    display_order: 2,
    created_at: createdAt,
  },
  {
    id: PACKAGE_IDS.skyline90,
    name: '90 Minutes - Dubai Skyline Tour',
    duration_minutes: 90,
    price_aed: 600,
    description: 'Comprehensive tour including Atlantis and both Burjs with breathtaking skyline views',
    image_url: '/skyline.jpg',
    max_participants: 2,
    is_active: true,
    display_order: 3,
    created_at: createdAt,
  },
  {
    id: PACKAGE_IDS.ultimate120,
    name: '120 Minutes - Complete Experience',
    duration_minutes: 120,
    price_aed: 750,
    description: 'Ultimate Dubai experience including Ain Dubai and all major landmarks',
    image_url: '/loop.jpg',
    max_participants: 2,
    is_active: true,
    display_order: 4,
    created_at: createdAt,
  },
];
