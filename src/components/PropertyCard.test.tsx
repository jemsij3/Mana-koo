import { render, screen } from '@testing-library/react';
import PropertyCard from './PropertyCard';
import { Property } from '@prisma/client';
import '@testing-library/jest-dom';

const mockProperty: Property = {
  id: 'prop-1',
  title: 'Beautiful Villa',
  description: 'A beautiful villa in the hills',
  price: 500000,
  currency: 'USD',
  address: '123 Villa St',
  city: 'Beverly Hills',
  state: 'CA',
  zipCode: '90210',
  country: 'USA',
  latitude: null,
  longitude: null,
  type: 'HOUSE',
  status: 'AVAILABLE',
  bedrooms: 4,
  bathrooms: 3,
  area: 2500,
  features: '["pool", "garden"]',
  images: '["/villa1.jpg", "/villa2.jpg"]',
  ownerId: 'user-1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PropertyCard', () => {
  it('renders property title, price, and location', () => {
    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText('Beautiful Villa')).toBeInTheDocument();
    expect(screen.getByText('$500,000')).toBeInTheDocument();
    expect(screen.getByText('Beverly Hills, CA')).toBeInTheDocument();
  });

  it('renders property details (beds, baths, area, type)', () => {
    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2500 sqft')).toBeInTheDocument();
    expect(screen.getByText('HOUSE')).toBeInTheDocument();
  });

  it('formats "AVAILABLE" status as "For Sale/Rent"', () => {
    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText('For Sale/Rent')).toBeInTheDocument();
  });

  it('displays actual status if not "AVAILABLE"', () => {
    render(<PropertyCard property={{ ...mockProperty, status: 'SOLD' }} />);

    expect(screen.getByText('SOLD')).toBeInTheDocument();
  });

  it('omits details when they are null', () => {
    render(<PropertyCard property={{ ...mockProperty, bedrooms: null, bathrooms: null, area: null }} />);

    // The details should not be in the document
    expect(screen.queryByTitle('Bedrooms')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Bathrooms')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Area')).not.toBeInTheDocument();
  });

  it('uses a placeholder image if property has no images', () => {
    render(<PropertyCard property={{ ...mockProperty, images: null }} />);

    const image = screen.getByRole('img');
    // Using string matching since next/image might transform the src
    expect(image.getAttribute('src')).toContain('placeholder-house.jpg');
  });

  it('formats currency correctly based on property currency', () => {
    render(<PropertyCard property={{ ...mockProperty, price: 1000000, currency: 'EUR' }} />);

    // Replace non-breaking space with regular space for matching if necessary,
    // or use a regex to match the value since Intl format can differ slightly between environments
    const priceElement = screen.getByText(/1,000,000/);
    expect(priceElement).toBeInTheDocument();
    // In US locale, EUR looks like €1,000,000
    expect(priceElement.textContent).toContain('€');
  });
});
