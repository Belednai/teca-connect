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
  type: 'infrastructure' | 'education' | 'healthcare' | 'water' | 'community' | 'economic';
  attachments?: string[];
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

export interface Media {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video' | 'document';
  payamId?: string;
  tags: string[];
  description?: string;
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
    budget: 25000,
    type: 'water'
  },
  {
    id: '2',
    title: 'Primary School Building',
    payamId: '2',
    description: 'Building a 6-classroom primary school with library and administrative offices.',
    status: 'planned',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    budget: 45000,
    type: 'education'
  },
  {
    id: '3',
    title: 'Community Center Construction',
    payamId: '3',
    description: 'Multi-purpose community center for meetings, events, and local governance.',
    status: 'completed',
    startDate: '2023-08-01',
    endDate: '2023-12-15',
    budget: 20000,
    type: 'community'
  },
  {
    id: '4',
    title: 'Health Clinic Establishment',
    payamId: '4',
    description: 'Setting up a basic health clinic with medical supplies and trained staff for Nyuak.',
    status: 'ongoing',
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    budget: 35000,
    type: 'healthcare'
  },
  {
    id: '5',
    title: 'Road Infrastructure Development',
    payamId: '5',
    description: 'Building 15km of all-weather roads connecting Pakeer to main transportation routes.',
    status: 'planned',
    startDate: '2024-04-01',
    endDate: '2024-11-30',
    budget: 60000,
    type: 'infrastructure'
  },
  {
    id: '6',
    title: 'Youth Skills Training Center',
    payamId: '6',
    description: 'Vocational training center offering carpentry, tailoring, and agriculture skills.',
    status: 'ongoing',
    startDate: '2024-01-20',
    endDate: '2024-09-30',
    budget: 28000,
    type: 'economic'
  },
  {
    id: '7',
    title: 'Water Well Construction - Phase 2',
    payamId: '1',
    description: 'Additional 3 water wells to extend coverage to remote areas of Ajuong.',
    status: 'planned',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    budget: 18000,
    type: 'water'
  },
  {
    id: '8',
    title: 'Market Infrastructure',
    payamId: '5',
    description: 'Construction of covered market stalls and storage facilities.',
    status: 'planned',
    startDate: '2024-05-15',
    endDate: '2024-10-31',
    budget: 22000,
    type: 'economic'
  }
];

export const leaders: Leader[] = [
  // Association Leadership
  {
    id: '1',
    name: 'Lt. Gen. Biar Mading Biar',
    title: 'Chairperson',
    bio: 'Lt. Gen. Biar Mading Biar serves as the Chairperson of TECA, bringing extensive leadership experience and dedication to community development and transparency. His military background provides strong organizational skills and commitment to serving the Twic East community.',
    group: 'association'
  },
  {
    id: '2',
    name: 'Gen. Philip Aguer Panyang',
    title: 'Secretary',
    bio: 'Gen. Philip Aguer Panyang serves as Secretary of TECA, coordinating administrative functions and community outreach programs. His leadership experience and commitment to community service make him an invaluable member of the leadership team.',
    group: 'association'
  },
  {
    id: '3',
    name: 'Deng Abraham Akech',
    title: 'Legal Advisor',
    bio: 'Deng Abraham Akech serves as Legal Advisor to TECA, providing essential legal guidance and ensuring compliance with regulations. His expertise in legal matters helps TECA navigate complex issues while maintaining transparency and accountability.',
    group: 'association'
  },
  {
    id: '4',
    name: 'Grace Aluel Garang',
    title: 'Resettlement Coordinator',
    bio: 'Grace leads the overall resettlement strategy and coordination across all payams. She has extensive experience in humanitarian work and community development.',
    group: 'resettlement'
  },
  // Payam-specific Resettlement Leaders
  {
    id: '5',
    name: 'Abraham Mayom Deng',
    title: 'Ajuong Payam Coordinator',
    bio: 'Abraham leads resettlement efforts in Ajuong, focusing on water infrastructure and agricultural development.',
    group: 'resettlement',
    payamId: '1'
  },
  {
    id: '6',
    name: 'Rebecca Ayen Majok',
    title: 'Kongor Payam Coordinator',
    bio: 'Rebecca oversees education and healthcare initiatives in Kongor Payam.',
    group: 'resettlement',
    payamId: '2'
  },
  {
    id: '7',
    name: 'Daniel Mabior Garang',
    title: 'Lith Payam Coordinator',
    bio: 'Daniel coordinates community center development and local governance structures in Lith.',
    group: 'resettlement',
    payamId: '3'
  },
  {
    id: '8',
    name: 'Sarah Nyankiir Deng',
    title: 'Nyuak Payam Coordinator',
    bio: 'Sarah leads comprehensive infrastructure and economic development projects in Nyuak.',
    group: 'resettlement',
    payamId: '4'
  },
  {
    id: '9',
    name: 'James Manyok Akot',
    title: 'Pakeer Payam Coordinator',
    bio: 'James focuses on road infrastructure and market development in Pakeer Payam.',
    group: 'resettlement',
    payamId: '5'
  },
  {
    id: '10',
    name: 'Elizabeth Nyandeng Majok',
    title: 'Pawuoi Payam Coordinator',
    bio: 'Elizabeth leads youth programs and skills development initiatives in Pawuoi.',
    group: 'resettlement',
    payamId: '6'
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
  },
  {
    id: '3',
    title: 'Community Leaders Meet to Plan 2024 Development Goals',
    slug: 'community-leaders-meet-plan-2024-development-goals',
    excerpt: 'Representatives from all six payams gather to set priorities and coordinate efforts.',
    content: `Community leaders from all six payams under TECA's resettlement program convened in Juba last week for a comprehensive planning session to establish development priorities for 2024.

The three-day meeting brought together payam coordinators, traditional leaders, and TECA executives to discuss ongoing projects, identify challenges, and set ambitious but achievable goals for the coming year.

Key outcomes include prioritizing education infrastructure in Kongor and Pawuoi, expanding healthcare services in Nyuak, and accelerating road development in Pakeer.

"Unity in planning ensures efficiency in implementation," noted Grace Aluel Garang, TECA's Resettlement Coordinator.`,
    publishedAt: '2024-02-28',
    tags: ['leadership', 'planning', 'community', 'development']
  },
  {
    id: '4',
    title: 'Youth Skills Training Program Shows Promising Results',
    slug: 'youth-skills-training-program-promising-results',
    excerpt: 'First cohort of 50 young people complete vocational training in Pawuoi.',
    content: `The inaugural cohort of TECA's Youth Skills Training Program in Pawuoi Payam has successfully completed their three-month intensive program, with 50 young people now equipped with marketable skills in carpentry, tailoring, and modern agriculture techniques.

The program, led by coordinator Elizabeth Nyandeng Majok, has exceeded expectations with a 95% completion rate and early indicators showing strong employment prospects for graduates.

"These young people are not just learning skills, they're becoming the foundation of our economic recovery," said Elizabeth. "Several have already started their own small businesses."

The success has prompted plans to expand the program to other payams, with Kongor and Nyuak identified as the next locations.`,
    publishedAt: '2024-03-05',
    tags: ['youth', 'education', 'economic', 'pawuoi', 'skills']
  },
  {
    id: '5',
    title: 'Transparency Report: Q1 2024 Financial Update',
    slug: 'transparency-report-q1-2024-financial-update',
    excerpt: 'Detailed breakdown of funds raised and spent across all payam projects.',
    content: `In line with TECA's commitment to transparency, we present our comprehensive Q1 2024 financial report, detailing all donations received and expenditures across our six-payam resettlement program.

Total funds raised in Q1: $87,450
Total funds disbursed: $72,300
Administrative costs: 8.5% (well below our 12% target)

Largest expenditures included water well construction in Ajuong ($25,000), health clinic supplies for Nyuak ($18,500), and youth training program materials in Pawuoi ($12,800).

All receipts and documentation are available for public review at our Juba office. We remain committed to the highest standards of financial accountability.`,
    publishedAt: '2024-04-01',
    tags: ['transparency', 'finance', 'accountability', 'report']
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
  },
  {
    id: '3',
    title: 'Payam Coordinators Workshop',
    slug: 'payam-coordinators-workshop',
    description: 'Training workshop for all payam coordinators on project management and community engagement.',
    startDate: '2024-05-10',
    endDate: '2024-05-12',
    location: 'TECA Training Center, Juba',
    rsvpEnabled: false
  },
  {
    id: '4',
    title: 'Youth Skills Fair and Competition',
    slug: 'youth-skills-fair-competition',
    description: 'Showcase of skills learned in our training programs with competitions and prizes.',
    startDate: '2024-06-01',
    location: 'Pawuoi Community Center',
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
  },
  {
    id: '3',
    donorName: 'South Sudan Women\'s Association',
    amount: 12000,
    payamId: '2',
    message: 'Supporting education for girls in Kongor',
    status: 'fulfilled',
    createdAt: '2024-02-15'
  }
];

export const media: Media[] = [
  {
    id: '1',
    title: 'Water Well Construction Progress in Ajuong',
    url: '/media/ajuong-water-well-construction.jpg',
    type: 'image',
    payamId: '1',
    tags: ['water', 'infrastructure', 'progress'],
    description: 'Workers installing the pump system for the third water well in Ajuong Payam.',
    createdAt: '2024-02-15'
  },
  {
    id: '2',
    title: 'Community Assembly 2024 Highlights',
    url: '/media/community-assembly-2024.mp4',
    type: 'video',
    tags: ['community', 'assembly', 'leadership'],
    description: 'Key moments from our annual community assembly including leadership speeches and community feedback.',
    createdAt: '2024-03-16'
  },
  {
    id: '3',
    title: 'Youth Training Program Graduation',
    url: '/media/youth-graduation-pawuoi.jpg',
    type: 'image',
    payamId: '6',
    tags: ['youth', 'education', 'graduation'],
    description: 'Proud graduates of the first Youth Skills Training Program cohort in Pawuoi.',
    createdAt: '2024-03-08'
  },
  {
    id: '4',
    title: 'Kongor School Construction Plans',
    url: '/media/kongor-school-blueprints.pdf',
    type: 'document',
    payamId: '2',
    tags: ['education', 'planning', 'infrastructure'],
    description: 'Architectural plans for the new 6-classroom primary school in Kongor.',
    createdAt: '2024-02-28'
  },
  {
    id: '5',
    title: 'Health Clinic Opening in Nyuak',
    url: '/media/nyuak-health-clinic-opening.jpg',
    type: 'image',
    payamId: '4',
    tags: ['healthcare', 'infrastructure', 'community'],
    description: 'Community celebration for the opening of Nyuak\'s first modern health clinic.',
    createdAt: '2024-03-20'
  },
  {
    id: '6',
    title: 'Road Construction Progress in Pakeer',
    url: '/media/pakeer-road-construction.jpg',
    type: 'image',
    payamId: '5',
    tags: ['infrastructure', 'roads', 'progress'],
    description: 'Heavy machinery working on the main access road to Pakeer Payam.',
    createdAt: '2024-03-25'
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

export const getPayamActivities = (payamId: string) => {
  return activities.filter(a => a.payamId === payamId);
};

export const getPayamLeadership = (payamId: string) => {
  return leaders.filter(l => l.payamId === payamId);
};

export const getAssociationLeadership = () => {
  return leaders.filter(l => l.group === 'association');
};

export const getResettlementLeadership = () => {
  return leaders.filter(l => l.group === 'resettlement');
};

export const getMediaByPayam = (payamId: string) => {
  return media.filter(m => m.payamId === payamId);
};

export const getMediaByType = (type: 'image' | 'video' | 'document') => {
  return media.filter(m => m.type === type);
};