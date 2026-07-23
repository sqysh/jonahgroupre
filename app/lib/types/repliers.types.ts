export interface RepliersListing {
  mlsNumber: string
  resource: string
  status: string
  class: string
  type: string
  listPrice: number
  listDate: string
  lastStatus: string
  soldDate: string | null
  soldPrice: number | null
  originalPrice: number
  simpleDaysOnMarket: number
  photoCount: number
  standardStatus: string
  updatedOn: string

  address: {
    addressKey: string
    area: string
    city: string
    communityCode: string | null
    country: string
    district: string | null
    majorIntersection: string | null
    neighborhood: string | null
    state: string
    streetDirection: string | null
    streetDirectionPrefix: string | null
    streetName: string
    streetNumber: string
    streetSuffix: string | null
    unitNumber: string | null
    zip: string
  }

  agents: Array<{
    name?: string
    email?: string
    phone?: string
    type?: string
  }>

  assignment: string | null
  boardId: number
  coopCompensation: string | null
  daysOnMarket: number | null

  details: {
    HOAFee: string | null
    HOAFee2: string | null
    HOAFee3: string | null
    airConditioning: string | null
    alternateURLVideoLink: string | null
    amperage: string | null
    analyticsClick: string | null
    balcony: string | null
    basement1: string | null
    basement2: string | null
    bathrooms: any[]
    businessSubType: string | null
    businessType: string | null
    ceilingType: string | null
    centralAirConditioning: string | null
    centralVac: string | null
    certificationLevel: string | null
    commonElementsIncluded: string | null
    constructionStatus: string | null
    constructionStyleSplitLevel: string | null
    den: string | null
    description: string
    driveway: string | null
    elevator: string | null
    energuideRating: string | null
    energyCertification: string | null
    exteriorConstruction1: string | null
    exteriorConstruction2: string | null
    extras: string | null
    familyRoom: string | null
    farmType: string | null
    fireProtection: string | null
    flooringType: string | null
    foundationType: string | null
    furnished: string | null
    garage: string | null
    greenPropertyInformationStatement: string | null
    handicappedEquipped: string | null
    heating: string | null
    landAccessType: string | null
    landDisposition: string | null
    landSewer: string | null
    landscapeFeatures: string | null
    laundryLevel: string | null
    leaseTerms: string | null
    liveStreamEventURL: string | null
    livingAreaMeasurement: string | null
    loadingType: string | null
    moreInformationLink: string | null
    numBathrooms: number | null
    numBathroomsHalf: number | null
    numBathroomsPlus: string | null
    numBedrooms: number | null
    numBedroomsPlus: string | null
    numDrivewaySpaces: number | null
    numFireplaces: number | null
    numGarageSpaces: number | null
    numKitchens: number | null
    numKitchensPlus: string | null
    numParkingSpaces: number | null
    numRooms: number | null
    numRoomsPlus: string | null
    parkCostMonthly: string | null
    patio: string | null
    propertyType: string | null
    roofMaterial: string | null
    sewer: string | null
    sqft: string | null
    sqftRange: string | null
    storageType: string | null
    style: string | null
    swimmingPool: string | null
    viewType: string | null
    virtualTourUrl: string | null
    waterSource: string | null
    waterfront: string | null
    yearBuilt: string | null
    zoning: string | null
    zoningDescription: string | null
    zoningType: string | null
  }

  images: string[]

  lot: {
    acres: number | null
    depth: number | null
    dimensions: string | null
    dimensionsSource: string | null
    features: string | null
    irregular: string | null
    legalDescription: string | null
    measurement: string
    size: string | null
    source: string | null
    squareFeet: number | null
    taxLot: string | null
    width: number | null
  }

  map: {
    latitude: number
    longitude: number
    point: string
  }

  nearby: {
    amenities: string[]
  }

  occupancy: string | null

  office: {
    brokerageName: string | null
  }

  openHouse: Array<{
    date?: string
    startTime?: string
    endTime?: string
    type?: string
  }>

  permissions: {
    displayAddressOnInternet: string
    displayPublic: string
    displayInternetEntireListing: string
  }

  rooms: Array<{
    type?: string
    level?: string
    length?: number
    width?: number
    description?: string
  }>

  taxes: {
    annualAmount: number
    assessmentYear: string
  }

  timestamps: {
    idxUpdated: string
    listingUpdated: string
    photosUpdated: string
    conditionalExpiryDate: string | null
    terminatedDate: string | null
    expirationDate?: string | null
    modificationTimestamp?: string | null
    originalEntryTimestamp?: string | null
  }

  condominium?: {
    buildingInsurance: string | null
    condoCorp: string | null
    condoCorpNum: string | null
    exposure: string | null
    lockerNumber: string | null
  }
}
