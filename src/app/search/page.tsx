import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import Button from "@/components/Button";

// Assuming Next.js 13+ with App Router
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Await the entire searchParams object as it's required in newer Next.js versions
  const params = await Promise.resolve(searchParams);
  
  const query = typeof params.q === 'string' ? params.q : '';
  const type = typeof params.type === 'string' ? params.type : '';
  const minPrice = typeof params.minPrice === 'string' ? parseInt(params.minPrice) : undefined;
  const maxPrice = typeof params.maxPrice === 'string' ? parseInt(params.maxPrice) : undefined;

  // Build where clause using Prisma's generated types approach
  const where: import("@prisma/client").Prisma.PropertyWhereInput = { 
    status: 'AVAILABLE' 
  };
  
  if (type) {
    where.type = type;
  }
  
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = minPrice;
    if (maxPrice) where.price.lte = maxPrice;
  }
  
  if (query) {
    where.OR = [
      { title: { contains: query } },
      { city: { contains: query } },
      { state: { contains: query } },
      { zipCode: { contains: query } },
    ];
  }

  const properties = await prisma.property.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-4">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Filters</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Location</label>
              <input 
                name="q"
                type="text" 
                defaultValue={query}
                placeholder="City, ZIP, etc." 
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select name="type" defaultValue={type} className="w-full p-2 border rounded-md text-gray-900">
                <option value="">All Types</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex gap-2">
                <input 
                  name="minPrice"
                  type="number" 
                  placeholder="Min" 
                  defaultValue={minPrice}
                  className="w-1/2 p-2 border rounded-md"
                />
                <input 
                  name="maxPrice"
                  type="number" 
                  placeholder="Max" 
                  defaultValue={maxPrice}
                  className="w-1/2 p-2 border rounded-md"
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">Apply Filters</Button>
          </form>
        </div>
      </div>
      
      {/* Results */}
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {properties.length} Properties Found
          </h1>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="p-1 border rounded-md text-sm text-gray-900">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
        
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
