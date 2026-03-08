import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export const MockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Only mock API calls, not external resource calls
  if (!req.url.includes('/products') && !req.url.includes('/api')) {
    return next(req);
  }

  // Mock product upload endpoint
  if (req.url.includes('/products/upload') && req.method === 'POST') {
    const mockResponse = {
      success: true,
      id: 'PROD-' + Date.now(),
      message: 'Product uploaded successfully',
      aiPrediction: {
        qualityGrade: 'A+',
        nutritionalValue: 'Excellent',
        pesticidesDetected: false,
        freshness: 98,
        estimatedYield: 450,
        marketPrice: 125.50,
        recommendation: 'Premium quality product ready for market'
      }
    };
    
    console.log('🎭 Mock API: Uploading product...', mockResponse);
    return of(new HttpResponse({ status: 200, body: mockResponse })).pipe(delay(1500)); // Simulate network delay
  }

  // Mock get all products
  if (req.url.includes('/products') && req.method === 'GET' && !req.url.includes('/products/upload')) {
    const mockProducts = [
      {
        id: 'PROD-001',
        cropName: 'Tomato',
        soilType: 'Loamy',
        pesticides: 'Neem Oil',
        harvestDate: '2026-02-28',
        gpsLocation: '12.9716, 77.5946',
        price: 45.50,
        quantity: 100,
        quantityUnit: 'kg',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="%23ef4444"/%3E%3Ccircle cx="60" cy="40" r="8" fill="%23fca5a5"/%3E%3C/svg%3E'
      },
      {
        id: 'PROD-002',
        cropName: 'Wheat',
        soilType: 'Clay',
        pesticides: 'Organic',
        harvestDate: '2026-02-15',
        gpsLocation: '28.6139, 77.2090',
        price: 28.75,
        quantity: 500,
        quantityUnit: 'kg',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect x="40" y="20" width="4" height="60" fill="%23d97706"/%3E%3Crect x="35" y="30" width="3" height="50" fill="%23f59e0b"/%3E%3Crect x="45" y="30" width="3" height="50" fill="%23f59e0b"/%3E%3C/svg%3E'
      },
      {
        id: 'PROD-003',
        cropName: 'Carrot',
        soilType: 'Sandy',
        pesticides: 'Pesticide Free',
        harvestDate: '2026-03-01',
        gpsLocation: '19.0760, 72.8777',
        price: 35.00,
        quantity: 250,
        quantityUnit: 'kg',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cpath d="M50 10 L60 40 L40 40 Z" fill="%23ea580c"/%3E%3Cellipse cx="50" cy="60" rx="15" ry="25" fill="%23f97316"/%3E%3C/svg%3E'
      }
    ];
    
    console.log('🎭 Mock API: Fetching products...', mockProducts);
    return of(new HttpResponse({ status: 200, body: mockProducts })).pipe(delay(800));
  }

  // Mock verify product by QR code or ID
  if (req.url.includes('/products/verify')) {
    const mockVerification = {
      verified: true,
      product: {
        id: 'PROD-001',
        cropName: 'Tomato',
        farmer: 'John Doe',
        harvestDate: '2026-02-28',
        qualityGrade: 'A+',
        gpsLocation: '12.9716, 77.5946',
        certifications: ['Organic', 'Fair Trade']
      },
      chain: [
        { stage: 'Farmer', date: '2026-02-28', location: 'Karnataka' },
        { stage: 'Distributor', date: '2026-03-01', location: 'Bangalore' },
        { stage: 'Retailer', date: '2026-03-04', location: 'Bangalore' }
      ]
    };
    
    console.log('🎭 Mock API: Verifying product...', mockVerification);
    return of(new HttpResponse({ status: 200, body: mockVerification })).pipe(delay(1000));
  }

  // Mock QR code generation
  if (req.url.includes('/qr') && req.method === 'POST') {
    const mockQRResponse = {
      success: true,
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==',
      productId: 'PROD-' + Date.now()
    };
    
    console.log('🎭 Mock API: Generating QR code...', mockQRResponse);
    return of(new HttpResponse({ status: 200, body: mockQRResponse })).pipe(delay(500));
  }

  // Mock authentication
  if (req.url.includes('/auth/login') && req.method === 'POST') {
    const mockLoginResponse = {
      success: true,
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 'USER-001',
        name: 'Demo User',
        email: 'demo@farmchainx.com',
        role: 'farmer'
      }
    };
    
    console.log('🎭 Mock API: Login successful', mockLoginResponse);
    return of(new HttpResponse({ status: 200, body: mockLoginResponse })).pipe(delay(1200));
  }

  // Mock registration
  if (req.url.includes('/auth/register') && req.method === 'POST') {
    const mockRegisterResponse = {
      success: true,
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 'USER-' + Date.now(),
        name: 'New User',
        email: 'newuser@farmchainx.com',
        role: 'farmer'
      },
      message: 'Registration successful'
    };
    
    console.log('🎭 Mock API: Registration successful', mockRegisterResponse);
    return of(new HttpResponse({ status: 200, body: mockRegisterResponse })).pipe(delay(1200));
  }

  // Mock dashboard data
  if (req.url.includes('/dashboard') && req.method === 'GET') {
    const mockDashboard = {
      totalProducts: 24,
      totalSales: 15000,
      pendingOrders: 5,
      revenue: 45000,
      recentActivity: [
        { action: 'Product Uploaded', date: '2026-03-07' },
        { action: 'Sale Completed', date: '2026-03-06', amount: 2500 },
        { action: 'QR Scanned', date: '2026-03-05' }
      ]
    };
    
    console.log('🎭 Mock API: Fetching dashboard...', mockDashboard);
    return of(new HttpResponse({ status: 200, body: mockDashboard })).pipe(delay(600));
  }

  // Default: pass through to actual backend (if it exists)
  console.log('🎭 Mock API: Passing through to backend -', req.method, req.url);
  return next(req);
};
