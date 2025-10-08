
export const locations = [
    { id: 1, name: 'Cyber Stage', description: 'The main stage for live music and keynotes.' },
    { id: 2, name: 'Pixel Plaza', description: 'A bustling square for meetups and art installations.' },
    { id: 3, name: 'Code Canyon', description: 'A quiet, focused area for workshops and hackathons.' },
    { id: 4, name: 'Data Falls', description: 'A relaxing zone with data visualizations and chill music.' },
];

export const events = [
    // Past Events
    { id: 101, locationId: 1, name: 'Synthwave Sunset Concert', date: '2023-10-25T19:00:00Z', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819' },
    { id: 102, locationId: 3, name: 'Intro to React Hooks Workshop', date: '2023-11-01T14:00:00Z', image: 'https://tsh.io/wp-content/uploads/2020/10/react-hooks-best-practices-lead_.jpg' },
    
    // Future Events for Pixel Plaza (Location 2) - There are 4 here
    { id: 103, locationId: 2, name: 'Virtual Art Gallery Opening', date: '2024-08-15T18:00:00Z', image: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d' },
    { id: 107, locationId: 2, name: 'Community Meet & Greet', date: '2024-08-22T17:00:00Z', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f' },
    { id: 108, locationId: 2, name: 'Live 3D Sculpting Session', date: '2024-09-05T16:00:00Z', image: 'https://pixune.com/wp-content/uploads/2023/01/how-to-create-a-digital-sculpture.jpg.webp' },
    { id: 109, locationId: 2, name: 'NFT Marketplace Launch Party', date: '2024-09-12T20:00:00Z', image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a' },

    // Other Future Events
    { id: 104, locationId: 4, name: 'Ambient Music & Data Sonification', date: '2024-08-16T20:00:00Z', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d' },
    { id: 105, locationId: 3, name: 'Advanced CSS Grid Challenge', date: '2024-08-17T11:00:00Z', image: 'https://static.wixstatic.com/media/54545e_9928ecc5d49442feb7de317a3da6016c~mv2.png/v1/fill/w_840,h_540,al_c/css%20grid.png' },
    { id: 106, locationId: 1, name: 'Keynote: The Future of the Web', date: '2024-08-20T10:00:00Z', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa' },
];
