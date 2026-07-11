import { notFound } from "next/navigation";
import Image from "next/image";
import { Bed, Bath, Square, MapPin, Check, Mail, Phone, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Button from "@/components/Button";

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  
  const property = await prisma.property.findUnique({
    where: { id: resolvedParams.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          createdAt: true,
        }
      }
    }
  });

  if (!property) {
    notFound();
  }

  const images = property.images ? JSON.parse(property.images) : [];
  const mainImage = images[0] || "/placeholder-house.jpg";
  const features = property.features ? property.features.split(',') : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: property.currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {property.status === 'AVAILABLE' ? 'For Sale/Rent' : property.status}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
              {property.type}
            </span>
            {property.verified && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                <Check className="h-4 w-4 mr-1" /> Verified
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <p className="text-gray-600 flex items-center text-lg">
            <MapPin className="h-5 w-5 mr-1" />
            {property.address}, {property.city}, {property.state} {property.zipCode}, {property.country}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl md:text-4xl font-bold text-blue-600">{formatPrice(property.price)}</p>
        </div>
      </div>

      {/* Image Gallery (Simplified for now) */}
      <div className="relative h-96 md:h-[500px] w-full bg-gray-200 rounded-xl overflow-hidden mb-8">
        <Image
          src={mainImage}
          alt={property.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Key Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border flex justify-between items-center text-gray-700">
            {property.bedrooms !== null && (
              <div className="flex flex-col items-center">
                <Bed className="h-8 w-8 text-blue-600 mb-1" />
                <span className="font-bold text-xl">{property.bedrooms}</span>
                <span className="text-sm">Bedrooms</span>
              </div>
            )}
            {property.bathrooms !== null && (
              <div className="flex flex-col items-center">
                <Bath className="h-8 w-8 text-blue-600 mb-1" />
                <span className="font-bold text-xl">{property.bathrooms}</span>
                <span className="text-sm">Bathrooms</span>
              </div>
            )}
            {property.area !== null && (
              <div className="flex flex-col items-center">
                <Square className="h-8 w-8 text-blue-600 mb-1" />
                <span className="font-bold text-xl">{property.area}</span>
                <span className="text-sm">SqFt Area</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="whitespace-pre-line">{property.description}</p>
            </div>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                {features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    {feature.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar / Agent Info */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Listed By</h3>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-gray-200 rounded-full overflow-hidden relative">
                {property.user.image ? (
                  <Image src={property.user.image} alt={property.user.name || "Agent"} fill className="object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-xl">
                    {(property.user.name || "A").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{property.user.name || "Property Owner"}</h4>
                <p className="text-gray-500 text-sm flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {new Date(property.user.createdAt).getFullYear()}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full justify-center">
                <Mail className="h-5 w-5 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full justify-center">
                <Phone className="h-5 w-5 mr-2" />
                Reveal Phone Number
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
