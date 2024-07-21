const HERO_GRAPHQL_FIELDS = `
  sys {
    id
  }
  heading
  subHeading
  actionButtonText
  image {
    url
    description
  }
`;

const ABOUT_PHOTOS_GRAPHQL_FIELDS = `
  sys {
    id
  }
  aboutImagesCollection {
    items {
      url
      description
    }
  }
`;

const HERO_VIDEOS_GRAPHQL_FIELDS = `
  sys {
    id
  }
  videosCollection {
    items {
      url
      description
    }
  }
`;

async function fetchGraphQL(query: any, preview = false) {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
          }`
      },
      body: JSON.stringify({ query }),
      next: { tags: ['heroSection', 'aboutPhotos'] }
    }
  );
  const data = await response.json();
  return data;
}

function extractHeroEntries(fetchResponse: any) {
  return fetchResponse?.data?.heroSectionCollection?.items || [];
}

function extractAboutPhotosEntries(fetchResponse: any) {
  return fetchResponse?.data?.aboutPhotosCollection?.items || [];
}

function extractHeroVideosEntries(fetchResponse: any) {
  return fetchResponse?.data?.heroVideosCollection?.items || [];
}

export async function getHeroVideos(isDraftMode = false) {
  const heroVideos = await fetchGraphQL(
    `query {
      heroVideosCollection(limit: 1, preview: ${isDraftMode ? 'true' : 'false'}) {
        items {
          ${HERO_VIDEOS_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return extractHeroVideosEntries(heroVideos)[0] || null;
}


export async function getHeroSection(isDraftMode = false) {
  const heroSection = await fetchGraphQL(
    `query {
      heroSectionCollection(limit: 1, preview: ${isDraftMode ? 'true' : 'false'}) {
        items {
          ${HERO_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return extractHeroEntries(heroSection)[0] || null;
}

export async function getAboutPhotos(isDraftMode = false) {
  const aboutPhotos = await fetchGraphQL(
    `query {
    aboutPhotosCollection(limit: 1, preview: ${isDraftMode ? 'true' : 'false'}) {
      items {
        ${ABOUT_PHOTOS_GRAPHQL_FIELDS}
      }
    }
  }`,
    isDraftMode
  );
  return extractAboutPhotosEntries(aboutPhotos)[0] || null;
}
