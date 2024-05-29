export function ImageKeyGenerator({ userId }: { userId: string }): string {
  return `click-draw/${userId}/${Math.random() * 100000}/image.jpg`;
}
