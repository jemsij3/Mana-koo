import Link from "next/link";
import { Search } from "lucide-react";
import Button from "@/components/Button";
import PropertyCard from "@/components/PropertyCard";
import { prisma } from "@/lib/prisma";

async function getFeaturedProperties() {
  return await prisma.property.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      status: 'AVAILABLE'
    }
  });
}

export default async function Home() {
  const properties = await getFeaturedProperties();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
          {/* We'd typically use next/image here with a hero image */}
          <div className="w-full h-full bg-gradient-to-r from-blue-800 to-blue-600"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Find Your Perfect Place
            </h1>
            <p className="text-xl mb-10 text-blue-100">
              Discover houses, apartments, land, and commercial properties that fit your lifestyle.
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="City, State, or Zip Code" 
                className="flex-grow p-3 rounded border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="p-3 rounded border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Any Type</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>
              <Link href="/search" className="w-full md:w-auto">
                <Button size="lg" className="w-full h-full flex items-center justify-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-600 mt-2">Explore some of our latest available listings.</p>
          </div>
          <Link href="/search" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            View all <span aria-hidden="true" className="ml-1">&rarr;</span>
          </Link>
        </div>
        
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">No properties available yet. Be the first to list one!</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Mana Koo?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Verified Listings</h3>
              <p className="text-gray-600">All properties undergo a verification process to ensure authenticity.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Direct Communication</h3>
              <p className="text-gray-600">Chat directly with property owners and agents securely on our platform.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Advanced Search</h3>
              <p className="text-gray-600">Find exactly what you&apos;re looking for with our powerful filtering options.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
