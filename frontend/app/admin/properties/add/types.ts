export interface PropertyFormData {
  propertyType?: string;
  projectName?: string;
  developerName?: string;
  propertyTitle?: string;
  bhk?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  balcony?: string | number;
  storeRoom?: string;
  poojaRoom?: string;
  lift?: string;
  carpetArea?: string | number;
  carpetAreaUnit?: string;
  builtupArea?: string | number;
  builtupAreaUnit?: string;
  superBuiltupArea?: string | number;
  superBuiltupAreaUnit?: string;
  plotArea?: string | number;
  plotAreaUnit?: string;
  constructionArea?: string | number;
  constructionAreaUnit?: string;
  facing?: string;
  totalFloors?: number;
  propertyFloor?: string | number;
  parking?: string | number;
  plotType?: string;
  furnishing?: string;
  washrooms?: string | number;
  cabins?: string | number;
  conferenceRooms?: string | number;
  city?: string;
  location?: string;
  fullAddress?: string;
  googleMapLink?: string;
  propertyPrice?: string | number;
  priceType?: string;
  bookingAmount?: string | number;
  maintenanceCharges?: string | number;
  pricePerSqft?: string | number;
  priceOnRequest?: boolean;
  projectStatus?: string;
  featured?: string;
  visibility?: string;
  launchDate?: string;
  possessionDate?: string;
  completionDate?: string;
  projectApproval?: string;
  totalTowers?: string | number;
  totalUnits?: string | number;
  amenities?: string[];
  coverImage?: File | null;
  galleryImages?: File[];
  floorPlans?: File[];
  masterPlan?: File | null;
  brochure?: File | null;
  projectVideo?: File | null;
  youtubeUrl?: string;
  virtualTourUrl?: string;
  [key: string]: unknown;
}

export interface SectionProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}

export interface LeadData {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  propertyTitle: string;
  assignedToUser?: string; // પેકેજ વાળા બિલ્ડર/એજન્ટનું નામ કે ID
  assignedDate?: string;
  status: "New" | "Assigned" | "In Progress" | "Closed";
}

export interface LeadData {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  propertyTitle: string;
  area: string; // ✨ નવું ફીલ્ડ: કયા એરિયા/સિટી માટેની લીડ છે
  assignedToUser?: string;
  assignedDate?: string;
  status: "New" | "Assigned" | "In Progress" | "Closed";
}

export interface LeadData {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  propertyTitle: string;
  area: string;
  receivedDate: string; // ✨ નવી તારીખ: લીડ ક્યારે આવી તે માટે
  assignedToUser?: string;
  assignedDate?: string;
  status: "New" | "Assigned" | "In Progress" | "Closed";
}

export interface PackageUser {
  id: string;
  name: string;
  role: "Builder" | "Broker" | "Owner"; // ✨ નવું: યુઝરનો રોલ
  packageName: string;
}

export interface PackageUser {
  id: string;
  name: string;
  role: "Builder" | "Broker" | "Owner";
  packageName: string;
  pricePaid: number;          // ✨ કેટલા રૂપિયામાં પેકેજ લીધું
  durationMonths: number;     // ✨ કેટલા સમય માટે (Months)
  purchaseDate: string;       // ✨ કઈ તારીખે લીધું
  expiryDate: string;         // ✨ ક્યારે પૂરું થશે
  paymentStatus: "Paid" | "Pending";
}

export interface PaymentSummary {
  totalRevenue: number;
  totalActiveUsers: number;
  builderRevenue: number;
  brokerRevenue: number;
  ownerRevenue: number;
}

export interface LeadData {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  propertyTitle: string;
  area: string;
  receivedDate: string;
  assignedToUser?: string;
  assignedDate?: string;
  status: "New" | "Assigned" | "In Progress" | "Closed";
}

export interface PackagePlan {
  id: string;
  planName: string;
  role: "Builder" | "Broker" | "Owner";
  price: number;
  durationMonths: number;
  leadLimit: number;
  features: string[];
}

export interface PaymentRecord {
  id: string;
  userName: string;
  role: "Builder" | "Broker" | "Owner";
  packageName: string;
  amountPaid: number;
  paymentMethod: "UPI" | "NetBanking" | "Card" | "Cash";
  paymentDate: string;
  expiryDate: string;
  status: "Success" | "Pending" | "Failed";
}

export interface PropertyListItem {
  id: string;
  title: string;
  type: string;
  location: string;
  price: string;
  status: "Active" | "Draft" | "Pending";
  featured: "Yes" | "No";
  addedByName: string;        // ✨ બિલ્ડર / એજન્ટ / ઓનરનું નામ
  addedByRole: "Builder" | "Broker" | "Owner"; // ✨ રોલ
  packageName: string;        // ✨ કયા પેકેજ હેઠળ એડ થઈ
}