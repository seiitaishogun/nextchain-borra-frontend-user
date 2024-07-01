export default function myImageLoader({ src, width, quality }: any) {
  if (!src.includes('http')) {
    return `${process.env.APP_IMAGE_URL}${src}?w=${width}&q=${quality || 75}`;
  }
  return `${src}?w=${width}&q=${quality || 75}`;
}
