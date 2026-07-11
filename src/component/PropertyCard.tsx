import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Property } from "@prisma/client";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const images = property.images ? JSON.parse(property.images) : [];
  const mainImage = images[0] || "/placeholder-house.jpg";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: property.currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
      <Link href={`/property/${property.id}`}>
        <div className="relative h-64 w-full bg-gray-200">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.status === 'AVAILABLE' ? 'For Sale/Rent' : property.status}
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 truncate pr-4" title={property.title}>
              {property.title}
            </h3>
            <p className="text-lg font-bold text-blue-600">
              {formatPrice(property.price)}
            </p>
          </div>
          
          <p className="text-gray-500 flex items-center mb-4">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{property.city}, {property.state}</span>
          </p>
          
          <div className="flex items-center justify-between text-gray-600 border-t pt-4">
            <div className="flex items-center space-x-4">
              {property.bedrooms !== null && (
                <div className="flex items-center" title="Bedrooms">
                  <Bed className="h-5 w-5 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms !== null && (
                <div className="flex items-center" title="Bathrooms">
                  <Bath className="h-5 w-5 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              {property.area !== null && (
                <div className="flex items-center" title="Area">
                  <Square className="h-5 w-5 mr-1" />
                  <span>{property.area} sqft</span>
                </div>
              )}
            </div>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              {property.type}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
