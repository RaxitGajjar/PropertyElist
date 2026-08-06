export interface PropertyFormData {
  // Property
  propertyType: string;

  // Project
  projectName: string;
  developerName: string;
  propertyTitle: string;

  // Apartment / Villa
  bhk: string;
  bedrooms: string;
  bathrooms: string;
  balcony: string;
  storeRoom: string;
  poojaRoom: string;
  lift: string;

  // Areas
  carpetArea: string;
  carpetAreaUnit: string;

  builtupArea: string;
  builtupAreaUnit: string;

  superBuiltupArea: string;
  superBuiltupAreaUnit: string;

  plotArea: string;
  plotAreaUnit: string;

  constructionArea: string;
  constructionAreaUnit: string;

  // Floor
  facing: string;
  totalFloors: number;
  propertyFloor: string;
  parking: string;

  // Plot
  plotType: string;

  // Commercial
  furnishing: string;
  washrooms: string;
  cabins: string;
  conferenceRooms: string;

  // Location
  city: string;
  location: string;
  fullAddress: string;
  googleMapLink: string;

  // Pricing
  propertyPrice: string;
  priceType: string;
  bookingAmount: string;
  maintenanceCharges: string;
  pricePerSqft: string;
  priceOnRequest: boolean;

  // Status
  projectStatus: string;
  featured: string;
  visibility: string;
  launchDate: string;
  possessionDate: string;
  completionDate: string;
  projectApproval: string;
  totalTowers: string;
  totalUnits: string;

  // Amenities
  amenities: string[];

  // Media
  coverImage: File | null;
  galleryImages: File[];
  floorPlans: File[];
  masterPlan: File | null;
  brochure: File | null;
  projectVideo: File | null;
  youtubeUrl: string;
  virtualTourUrl: string;
}