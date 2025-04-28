import React, { Suspense } from 'react';

// Dynamically import images if necessary (good for larger apps)
// Here we'll assume simple static URLs

const images = [
    "https://images.unsplash.com/photo-1558980395-be8a5fcb4251",
    "https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae",
    "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
    "https://images.unsplash.com/photo-1720884413532-59289875c3e1",
    "https://images.unsplash.com/photo-1593696954577-ab3d39317b97",
    "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b",
    "https://plus.unsplash.com/premium_photo-1661963063875-7f131e02bf75",
    "https://images.unsplash.com/photo-1721132447246-5d33f3008b05",
    "https://images.unsplash.com/photo-1578645635737-6a88e706e0f1",
    "https://images.unsplash.com/photo-1723129092506-5cd0cd84decd"
];

function LazyLoadImagePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Lazy Loaded Images</h1>
      {images.map((src, index) => (
        <div key={index} style={{ marginBottom: '1000px' }}>
          <img
            src={`${src}?w=600&auto=format&fit=crop&dpr=2`} 
            alt={`Example-Photo ${index + 1}`}
            loading="lazy"
            width="600"
            height="400"
            style={{ width: '100%', maxWidth: '600px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
          <p style={{ textAlign: 'center' }}>Image {index + 1}</p>
        </div>
      ))}
    </div>
  );
}

export default LazyLoadImagePage;
