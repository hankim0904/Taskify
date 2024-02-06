export default function extractFirstLetter(nickname: string) {
  if (nickname) {
    return nickname[0].toUpperCase();
  }
}
