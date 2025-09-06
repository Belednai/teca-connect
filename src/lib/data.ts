// Mock data for TECA application

export interface Payam {
  id: string;
  name: string;
  slug: string;
  requestedAmount: number;
  raisedAmount: number;
  description: string;
  activities: Activity[];
  leadership: Leader[];
}

export interface Activity {
  id: string;
  title: string;
  payamId?: string;
  description: string;
  status: 'planned' | 'ongoing' | 'completed';
  startDate: string;
  endDate?: string;
  budget?: number;
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo?: string;
  group: 'association' | 'resettlement';
  payamId?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  coverImage?: string;
  rsvpEnabled: boolean;
}

export interface Donation {
  id: string;
  donorName?: string;
  amount: number;
  method: string;
  payamId?: string;
  message?: string;
  isPublic: boolean;
  verified: boolean;
  createdAt: string;
}

export interface Pledge {
  id: string;
  donorName?: string;
  amount: number;
  payamId?: string;
  message?: string;
  status: 'pending' | 'fulfilled' | 'cancelled';
  createdAt: string;
}

// Mock Data
export const payams: Payam[] = [
  {
    id: '1',
    name: 'Ajuong',
    slug: 'ajuong',
    requestedAmount: 150000,
    raisedAmount: 45000,
    description: 'Ajuong Payam focuses on agricultural development and water infrastructure for sustainable resettlement.',
    activities: [],
    leadership: []
  },
  {
    id: '2',
    name: 'Kongor',
    slug: 'kongor',
    requestedAmount: 180000,
    raisedAmount: 67000,
    description: 'Kongor Payam prioritizes education facilities and healthcare infrastructure development.',
    activities: [],
    leadership: []
  },
  {
    id: '3',
    name: 'Lith',
    slug: 'lith',
    requestedAmount: 120000,
    raisedAmount: 38000,
    description: 'Lith Payam emphasizes community centers and local governance structures.',
    activities: [],
    leadership: []
  },
  {
    id: '4',
    name: 'Nyuak',
    slug: 'nyuak',
    requestedAmount: 200000,
    raisedAmount: 78000,
    description: 'Nyuak Payam focuses on comprehensive infrastructure and economic development.',
    activities: [],
    leadership: []
  },
  {
    id: '5',
    name: 'Pakeer',
    slug: 'pakeer',
    requestedAmount: 135000,
    raisedAmount: 41000,
    description: 'Pakeer Payam prioritizes road infrastructure and market development.',
    activities: [],
    leadership: []
  },
  {
    id: '6',
    name: 'Pawuoi',
    slug: 'pawuoi',
    requestedAmount: 165000,
    raisedAmount: 52000,
    description: 'Pawuoi Payam emphasizes youth programs and skills development initiatives.',
    activities: [],
    leadership: []
  }
];

export const activities: Activity[] = [
  {
    id: '1',
    title: 'Water Well Construction - Phase 1',
    payamId: '1',
    description: 'Construction of 5 water wells to provide clean water access for 500 families in Ajuong.',
    status: 'ongoing',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: 25000
  },
  {
    id: '2',
    title: 'Primary School Building',
    payamId: '2',
    description: 'Building a 6-classroom primary school with library and administrative offices.',
    status: 'planned',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    budget: 45000
  },
  {
    id: '3',
    title: 'Community Center Construction',
    payamId: '3',
    description: 'Multi-purpose community center for meetings, events, and local governance.',
    status: 'completed',
    startDate: '2023-08-01',
    endDate: '2023-12-15',
    budget: 20000
  }
];

export const leaders: Leader[] = [
  {
    id: '1',
    name: 'John Deng Majok',
    title: 'Chairman',
    bio: 'John has been leading TECA with dedication to community development and transparency since 2020.',
    group: 'association'
  },
  {
    id: '2',
    name: 'Mary Nyandeng Akot',
    title: 'Secretary General',
    bio: 'Mary coordinates all administrative functions and community outreach programs.',
    group: 'association'
  },
  {
    id: '3',
    name: 'Peter Malual Deng',
    title: 'Treasurer',
    bio: 'Peter oversees all financial operations and ensures transparent fund management.',
    group: 'association'
  },
  {
    id: '4',
    name: 'Grace Aluel Garang',
    title: 'Resettlement Coordinator',
    bio: 'Grace leads the overall resettlement strategy and coordination across all payams.',
    group: 'resettlement'
  }
];

export const news: NewsItem[] = [
  {
    id: '1',
    title: 'TECA Launches Major Resettlement Initiative',
    slug: 'teca-launches-major-resettlement-initiative',
    excerpt: 'New comprehensive program aims to support 10,000 families returning to Twic East County.',
    content: `TECA has officially launched its most ambitious resettlement initiative to date, aimed at supporting the return and sustainable settlement of 10,000 families to Twic East County.

The initiative, spanning six payams, focuses on creating essential infrastructure including water systems, schools, health facilities, and community centers. 

"This is a historic moment for our community," said John Deng Majok, TECA Chairman. "We are not just facilitating return, but building foundations for long-term prosperity."

The program will be implemented in phases over the next three years, with transparent fund management and community participation at every level.`,
    publishedAt: '2024-01-15',
    tags: ['resettlement', 'community', 'infrastructure']
  },
  {
    id: '2',
    title: 'Water Wells Completed in Ajuong Payam',
    slug: 'water-wells-completed-ajuong-payam',
    excerpt: 'Five new water wells provide clean water access to over 500 families.',
    content: `The first phase of water infrastructure development in Ajuong Payam has been successfully completed with the installation of five modern water wells.

These wells, strategically located across the payam, now provide clean and reliable water access to over 500 families, significantly improving health outcomes and reducing the daily burden of water collection.

The project was completed on schedule and within budget, demonstrating TECA's commitment to efficient and effective project implementation.`,
    publishedAt: '2024-02-20',
    tags: ['water', 'ajuong', 'infrastructure', 'health']
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Annual TECA Community Assembly',
    slug: 'annual-teca-community-assembly',
    description: 'Join us for our annual assembly to review progress, discuss challenges, and plan for the year ahead.',
    startDate: '2024-03-15',
    location: 'Juba Community Center',
    rsvpEnabled: true
  },
  {
    id: '2',
    title: 'Fundraising Dinner Gala',
    slug: 'fundraising-dinner-gala',
    description: 'An elegant evening of dining, entertainment, and community support for resettlement efforts.',
    startDate: '2024-04-20',
    location: 'Pyramid Hotel, Juba',
    rsvpEnabled: true
  }
];

export const donations: Donation[] = [
  {
    id: '1',
    donorName: 'Anonymous Donor',
    amount: 5000,
    method: 'Bank Transfer',
    payamId: '1',
    message: 'Supporting water infrastructure in Ajuong',
    isPublic: true,
    verified: true,
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    donorName: 'Community Group - Juba',
    amount: 2500,
    method: 'Cash',
    payamId: '2',
    message: 'For education in Kongor',
    isPublic: true,
    verified: true,
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    amount: 10000,
    method: 'Mobile Money',
    payamId: '4',
    message: 'General development fund',
    isPublic: false,
    verified: true,
    createdAt: '2024-01-20'
  }
];

export const pledges: Pledge[] = [
  {
    id: '1',
    donorName: 'Local Business Association',
    amount: 15000,
    payamId: '3',
    message: 'Committed to supporting Lith community center',
    status: 'pending',
    createdAt: '2024-02-01'
  },
  {
    id: '2',
    donorName: 'Diaspora Community - Australia',
    amount: 8000,
    payamId: '5',
    message: 'For road infrastructure in Pakeer',
    status: 'pending',
    createdAt: '2024-02-05'
  }
];

// Helper functions
export const getTotalRaised = () => {
  return donations.filter(d => d.verified).reduce((sum, d) => sum + d.amount, 0);
};

export const getTotalRequested = () => {
  return payams.reduce((sum, p) => sum + p.requestedAmount, 0);
};

export const getProgressPercentage = () => {
  const total = getTotalRequested();
  const raised = getTotalRaised();
  return total > 0 ? Math.round((raised / total) * 100) : 0;
};

export const getPayamProgress = (payamId: string) => {
  const payam = payams.find(p => p.id === payamId);
  if (!payam) return 0;
  
  const payamDonations = donations
    .filter(d => d.payamId === payamId && d.verified)
    .reduce((sum, d) => sum + d.amount, 0);
  
  return payam.requestedAmount > 0 ? Math.round((payamDonations / payam.requestedAmount) * 100) : 0;
};