const fs = require('fs');
const path = require('path');

function transformProduct(raw) {
  // Calculate overall score based on social proof
  const socialScore = Math.min(
    (raw.socialProof.productHuntUpvotes || 0) * 2,
    20
  );

  // Calculate design score based on image quality
  const designScore = raw.image ? 15 : 5;

  // Calculate value score based on pricing
  const valueScore = raw.pricing.toLowerCase().includes('free') ? 18 : 12;

  // Calculate features score based on key features
  const featuresScore = (raw.keyFeatures?.length || 0) * 2;

  // Calculate originality score based on description
  const originalityScore = raw.description.length > 200 ? 16 : 10;

  // Calculate clarity score based on description
  const clarityScore = raw.description.length > 100 ? 14 : 8;

  // Calculate team score based on social proof
  const teamScore = Math.min(
    ((raw.socialProof.twitterFollowers || 0) +
    (raw.socialProof.githubStars || 0)) / 1000,
    15
  );

  return {
    name: raw.productName,
    slug: raw.slug,
    description: raw.description,
    shortDescription: raw.description.slice(0, 150) + '...',
    website: raw.websiteUrl,
    image: raw.image,
    launchDate: raw.launchDate,
    pricing: raw.pricing,
    source: raw.source,
    category: raw.category === 'AI & Machine Learning' ? 'AI' : raw.category === 'Other' ? 'Others' : raw.category,
    tags: raw.tags,
    overallScore: Math.round(
      (socialScore + designScore + valueScore + featuresScore + originalityScore + clarityScore + teamScore) / 7
    ),
    scores: {
      design: designScore,
      value: valueScore,
      features: featuresScore,
      originality: originalityScore,
      clarity: clarityScore,
      team: teamScore,
    },
    pros: raw.pros || ['No pros listed yet'],
    cons: raw.cons || ['No cons listed yet'],
    verdict: raw.verdict || 'Worth Watching',
  };
}

// Read the raw products data
const rawProductsPath = path.join(process.cwd(), 'src/data/products.json');
const rawProducts = JSON.parse(fs.readFileSync(rawProductsPath, 'utf-8'));

// Transform the products
const transformedProducts = rawProducts.map(transformProduct);

// Write the transformed products
const transformedProductsPath = path.join(process.cwd(), 'src/data/transformed-products.json');
fs.writeFileSync(transformedProductsPath, JSON.stringify(transformedProducts, null, 2));

console.log('Products transformed successfully!'); 